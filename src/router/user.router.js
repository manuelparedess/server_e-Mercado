const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const md_auth = require('../middlewares/authenticated.js');

//Routes
router.get('/me', [md_auth.verifyToken], UserController.getUser);
router.get('/:id', UserController.getUserById);
router.post('/favorites/:id', [md_auth.verifyToken], UserController.addFavorite);
router.delete('/favorites/:id', [md_auth.verifyToken], UserController.deleteFavorite);
router.put('/update', [md_auth.verifyToken], UserController.updateUser);
router.put('/password/reset', [md_auth.verifyToken], UserController.updatePassword);
router.delete('/me', [md_auth.verifyToken], UserController.deleteUser);


module.exports = router;