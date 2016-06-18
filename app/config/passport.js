
var local_strategy = require('passport-local').Strategy;
var facebook_strategy = require('passport-facebook').Strategy;
var user_model = require('../../app/models/user');
var authentication_config = require('./authentication');

module.exports = function (passport) {

	passport.serializeUser( function(user, done) {
		done(null, user.id)
	})

	passport.deserializeUser( function(user_id, done) {
		user_model.findById(user_id, function(error, user) {
			done(error, user)
		})
	})

	// Facebook
	passport.use(new facebook_strategy({
		clientID : authentication_config.facebook_authentication.client_id,
		clientSecret : authentication_config.facebook_authentication.client_secret,
		callbackURL : authentication_config.facebook_authentication.callback_url
	}, function (token, refreshToken, profile, done) {
		process.nextTick(function() {
			user_model.findOne({'facebook.id' : profile.id}, function(error, user) {
				if (error) {
					console.log(error);
					return ;
				}

				if (user) {
					return done(null, user)
				} else {
					// Create user
					console.log(profile);
					var user = new user_model();
					user.facebook.id = profile.id;
					user.facebook.token = token;
					// user.facebook.email = profile.emails.value;
					user.facebook.name = profile.displayName;

					user.save(function(error, user) {
						if (error) {
							console.log(error);
							return;
						} 
						if (user) {
							return done(null, user)
						}
					})
				}
			})
		})
	}))
}
