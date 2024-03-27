const mongoose = require('mongoose');

const users = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: { type: String, require: true },
});

const User = mongoose.model('user', users);

module.exports = User;
