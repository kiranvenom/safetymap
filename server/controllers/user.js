const user = require('../models/users');

const getUsers = async (req, res) => {
	try {
		const users = await user.find();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const postNewUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await user.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already registered' });
		}

		const newUser = new user({ name, email, password });
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	getUsers,
	postNewUser,
};
