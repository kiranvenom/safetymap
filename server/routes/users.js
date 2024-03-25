const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/api/users', userController.getUsers);
router.post('/api/register', userController.postNewUser);
router.post('/api/login', userController.loginUser);

module.exports = router;
