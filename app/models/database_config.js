var mongoose = require('mongoose');

var mongoDbUri = 'UPDATE_MONGO_DATABASE_URL'

mongoose.connect(mongoDbUri);

/**
 * Connection Event Handlers
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + mongoDbUri);
});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose connection error ' + error);
});

mongoose.connection.on('disconnected', function () {
   console.log('Mongoose disconnected');
});

// Model File
require('./user');