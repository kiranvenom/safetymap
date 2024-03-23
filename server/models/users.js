const mongoose = require('mongoose');

const users = mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const user = mongoose.model('user', users);

module.exports = user;
