const Location = require('../models/location');

// Create pin
const createPin = async (req, res) => {
	const {
		userMail,
		latitude,
		longitude,
		safetyConcern,
		safetyConcernExperience,
		safetyZone,
		comments,
	} = req.body;

	const newPin = new Location({
		userMail,
		latitude,
		longitude,
		safetyConcern,
		safetyConcernExperience,
		safetyZone,
		comments,
	});

	newPin
		.save()
		.then((pin) => {
			res.status(201).json(pin);
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
};

const getPin = async (req, res) => {
	try {
		const pins = await Location.find();
		res.json(pins);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	createPin,
	getPin,
};
