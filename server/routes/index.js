const express = require('express');
const router = express.Router();

const users = require('./users.js');

router.use(users);

module.exports = router;
