
module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.ejs')
	})

	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/authentication/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user 
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
