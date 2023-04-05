const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// router.post('/register', userController.register);
// router.post('/login', userController.login);
router.get('/profile', userController.showProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
