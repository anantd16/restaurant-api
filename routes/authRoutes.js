const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /register - Register a new user
router.post('/register', register);

// POST /login - Login using email and password, generate JWT token
router.post('/login', login);

module.exports = router;
