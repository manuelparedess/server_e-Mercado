const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller.js');
const md_auth = require('../middlewares/authenticated.js');


//Multer configuration 
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
  
const upload = multer({ storage });

//ROUTES
//Public
router.get('/all', ProductController.getAllProducts);
router.get('/random', ProductController.getRandomProducts);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/name/:name', ProductController.getProductsByName);
router.get('/id/:id', ProductController.getProductById);
router.put('/stock/:id', ProductController.updateStock);

//Private
router.post('/create', [md_auth.verifyToken], upload.array('image', 5), ProductController.createProduct);
router.put('/update/:id', [md_auth.verifyToken], upload.array('image', 5), ProductController.updateProduct);
router.put('/images/:id', [md_auth.verifyToken], ProductController.deleteProductImage);
router.delete('/delete/:id', [md_auth.verifyToken], ProductController.deleteProduct);
router.get('/me', [md_auth.verifyToken], ProductController.getMyProducts);
router.post('/review/:id', [md_auth.verifyToken], ProductController.addReview);
router.delete('/review/:id', [md_auth.verifyToken], ProductController.deleteReview);


module.exports = router;