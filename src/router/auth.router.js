const express = require('express');
const AuthController = require('../controllers/auth.controller.js');

const router = express.Router();

//Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;