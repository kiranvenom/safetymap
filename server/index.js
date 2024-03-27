const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./conn');

const routes = require('./routes/index');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
	res.send('welcome to backend');
});

app.listen(PORT, () => {
	console.log('running on port :: ' + PORT);
});
