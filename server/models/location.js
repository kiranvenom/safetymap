const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema(
	{
		userMail: { type: String, required: true },
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
		safetyConcern: { type: String, required: true },
		safetyConcernExpirence: String,
		safetyZone: { type: String, required: true },
		comments: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
