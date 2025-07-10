const Product = require('../models/product.model');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

//Create
const createProduct = async (req, res) => {

    //user
    const { user_id } = req.user;

    //product
    const { name, description, price, category, stock } = req.body;

    //images
    const images = await Promise.all(
        req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path, {
                    folder: 'e-Mercado',
                }, (err, result) => {
                    fs.unlinkSync(file.path); // Delete the local file from the disk
                    if (err) return reject(err);
                    resolve(result.secure_url); // Return Cloudinary URL
                });
            });
        })
    );
    
    const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        images,
        reviews: [],
        createdBy: {
            user: user_id,
        },
    });

    try {
        await product.save();
        res.status(201).send({ msg: '✅ Producto creado' });
    } catch (error) {
        res.status(500).send({ msg: '❌ Error creando producto' });

    }
}


//Getters
const getAllProducts = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 15;

    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(limit);

        if (!products.length) {
            return res.status(200).send({
                info: {
                    count: 0
                },
                results: []
            });
        }

        const total = await Product.countDocuments();
        const totalPages = Math.ceil(total / limit);
        const next = page < totalPages ? `http://localhost:5000/api/products/all?page=${page + 1}` : null;
        const prev = page > 1 ? `http://localhost:5000/api/products/all?page=${page - 1}` : null;

        const response = {
            info: {
                count: total,
                pages: totalPages,
                next,
                prev
            },
            results: products
        }

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({ msg: '❌ Error al obtener los productos' });

    }
}

const getMyProducts = async (req, res) => {

    const { user_id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    try {

        // Search products by user id
        const createdBy = { user: user_id };
        const products = await Product.find({ createdBy }).skip(skip).limit(limit);
        if (!products.length) {
            return res.status(200).send({
                info: {
                    count: 0,
                },
                results: []
            });
        }

        const total = await Product.countDocuments({ 'createdBy.user': user_id });
        const totalPages = Math.ceil(total / limit);
        const next = page < totalPages ? `http://localhost:5000/api/products/me?page=${page + 1}` : null;
        const prev = page > 1 ? `http://localhost:5000/api/products/me?page=${page - 1}` : null;

        const response = {
            info: {
                count: total,
                pages: totalPages,
                next,
                prev
            },
            results: products
        }

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({ msg: '❌ Error al obtener los productos' });

    }

}

const getRandomProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 12 } }
        ]);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ msg: '❌ Error al obtener los productos' });
    }
}

const getProductsByCategory = async (req, res) => {

    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    try {

        // Search products by category
        const products = await Product.find({ category }).skip(skip).limit(limit);
        if (!products.length) {
            return res.status(404).send({ msg: '❌ No products found' });
        }

        const total = await Product.countDocuments({ category });
        const totalPages = Math.ceil(total / limit);
        const next = page < totalPages ? `http://localhost:5000/api/products/category/${category}?page=${page + 1}` : null;
        const prev = page > 1 ? `http://localhost:5000/api/products/category/${category}?page=${page - 1}` : null;

        const response = {
            info: {
                count: total,
                pages: totalPages,
                next,
                prev
            },
            results: products
        }

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({ msg: '❌ Error getting products' });

    }

}

const getProductsByName = async (req, res) => {

    const { name } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    try {

        // Search products by name
        const products = await Product.find({ name: { $regex: name, $options: 'i' } }).skip(skip).limit(limit);
        if (!products.length) {
            return res.status(200).send({
                info: {
                    count: 0,
                },
                results: []
            });
        }

        const total = await Product.countDocuments({ name: { $regex: name, $options: 'i' } });
        const totalPages = Math.ceil(total / limit);
        const next = page < totalPages ? `http://localhost:5000/api/products/name/${name}?page=${page + 1}` : null;
        const prev = page > 1 ? `http://localhost:5000/api/products/name/${name}?page=${page - 1}` : null;

        const response = {
            info: {
                count: total,
                pages: totalPages,
                next,
                prev
            },
            results: products
        }

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({ msg: '❌ Error al obtener los productos' });

    }

}

const getProductById = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ msg: '❌ Product not found' });
        }

        return res.status(200).send(product);

    } catch (error) {
        res.status(500).send({ msg: '❌ Invalid product' });
    }
}

//Add
const addReview = async (req, res) => {

    //user
    const { user_id } = req.user;
    const { id } = req.params;

    const { rating, text } = req.body;

    const newReview = {
        user: user_id,
        rating,
        text,
        createdAt: Date.now()
    }

    try {
        const product = await Product.findById(id);

        const alreadyReviewed = product.reviews.find((rev) => rev.user === user_id);
        if (alreadyReviewed) return res.status(400).send({ msg: '❌ Usted ya ha reseñado este producto.' });
        if (product.createdBy.user == user_id) return res.status(400).send({ msg: '❌ No puedes reseñar tu propio producto.' });

        product.reviews.push(newReview);
        await product.save();
        res.status(200).send({ msg: '✅ Reseña enviada' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error enviando reseña' });

    }
}

//Update
const updateProduct = async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const newData = req.body;
    const images = await Promise.all(
        req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path, {
                    folder: 'e-Mercado',
                }, (err, result) => {
                    fs.unlinkSync(file.path); // Delete the local file from the disk
                    if (err) return reject(err);
                    resolve(result.secure_url); // Return Cloudinary URL
                });
            });
        })
    );

    try {

        const product = await Product.findById(id);
        if (product.createdBy.user != user_id) return res.status(400).send({ msg: '❌ No está autorizado a modificar este producto.' });

        if (images.length) {
            newData.images = [...product.images, ...images];
        }

        await Product.findByIdAndUpdate({ _id: id }, newData);
        res.status(200).send({ msg: '✅ Producto actualizado' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error actualizando producto' });

    }
}

const updateStock = async (req, res) => {
    const { id } = req.params;
    const stock = req.body;

    try {
        const product = await Product.findById(id);

        await Product.findByIdAndUpdate({ _id: id }, stock);
        res.status(200).send({ msg: '✅ Se ha actualizado el stock del producto' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error actualizando el stock del producto' });

    }
}

//Delete
const deleteReview = async (req, res) => {

    //user
    const { user_id } = req.user;
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        product.reviews = product.reviews.filter((rev) => rev.user !== user_id);

        await product.save();
        res.status(200).send({ msg: '✅ Reseña eliminada' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error eliminando reseña' });

    }
}

const deleteProductImage = async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const imagesURL = req.body;

    try {
        const product = await Product.findById(id);
        if (product.createdBy.user != user_id) return res.status(400).send({ msg: '❌ No está autorizado a modificar este producto.' });

        await Product.findByIdAndUpdate({ _id: id }, imagesURL);

        res.status(200).send({ msg: '✅ Imagen eliminada' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error eliminando imagen' });

    }
}


const deleteProduct = async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (product.createdBy.user != user_id) return res.status(400).send({ msg: '❌ No está autorizado a eliminar este producto.' });

        await Product.findByIdAndDelete(id);

        res.status(200).send({ msg: '✅ Producto eliminado' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error eliminando producto' });

    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getMyProducts,
    getRandomProducts,
    getProductsByCategory,
    getProductsByName,
    getProductById,
    addReview,
    updateProduct,
    updateStock,
    deleteReview,
    deleteProductImage,
    deleteProduct
}