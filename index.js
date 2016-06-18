var express = require('express');
var passport = require('passport');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var logger = require('morgan');
var body_parser = require('body-parser');
var passport = require('passport');
var session = require('express-session')
var flash = require('connect-flash');


require('./app/models/database_config');
require('./app/config/passport')(passport);


	// set up our express application
app.use(logger('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false}));

app.set('views', './app/views');
app.set('view engine', 'ejs'); 

// required for passport
app.use(session({ secret: 'barneyshometown' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 


// routes ======================================================================
require('./app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
