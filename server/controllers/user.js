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

module.exports = {
	getUsers,
};
