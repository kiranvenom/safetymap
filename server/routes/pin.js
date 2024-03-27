const express = require('express');
const router = express.Router();
const pinsControllder = require('../controllers/pins');

router.get('/api/createpins', pinsControllder.getPin);
router.post('/api/createpins', pinsControllder.createPin);

module.exports = router;
