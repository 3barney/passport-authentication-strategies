var mongoose = require('mongoose');

var mongoLabUri = 'USE MONGODB URI'

mongoose.connect(mongoLabUri);

/**
 * Connection Event Handlers
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + mongoLabUri);
});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose connection error ' + error);
});

mongoose.connection.on('disconnected', function () {
   console.log('Mongoose disconnected');
});

// Model File
require('./user');