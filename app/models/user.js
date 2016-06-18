var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	facebook : {
		id : { type : String },
		token : { type : String },
		email : { type : String},
		name : { type : String}
	}
});

module.exports = mongoose.model('user_model', userSchema);
