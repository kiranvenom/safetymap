const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MongoDB_URI).then(() => {
	console.log(`connected to DB`);
});
