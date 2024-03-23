const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://km060360:Apl4Twsdcuw6otHo@safe.rhezcyy.mongodb.net/safty?retryWrites=true&w=majority&appName=safe',
	)
	.then(() => {
		console.log(`connected to DB`);
	});
