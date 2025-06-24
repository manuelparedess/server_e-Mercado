const express = require('express');
const AuthController = require('../controllers/auth.controller.js');

const router = express.Router();
const md_auth = require('../middlewares/authenticated.js');

//Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google', [md_auth.verifyGoogleToken], AuthController.loginWithGoogle);

module.exports = router;