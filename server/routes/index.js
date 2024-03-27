const express = require('express');
const router = express.Router();

const users = require('./users.js');
const pins = require('./pin.js');

router.use(users);
router.use(pins);

module.exports = router;
