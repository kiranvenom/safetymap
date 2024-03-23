const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/api/users', userController.getUsers);

module.exports = router;
