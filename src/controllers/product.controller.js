const Product = require('../models/product.model');

//Create
const createProduct = async (req, res) => {

    //user
    const { user_id } = req.user;

    //product
    const { name, description, price, category, stock } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
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
        res.status(201).send({ msg: '✅ Saved product' });
    } catch (error) {
        res.status(500).send({ msg: '❌ Error creating product' });

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
            return res.status(404).send({ msg: '❌ No products found' });
        }

        const total = await Product.countDocuments();
        const totalPages = Math.ceil(total / limit);
        const next = page < totalPages ? `http://localhost:5000/api/products?page=${page + 1}` : null;
        const prev = page > 1 ? `http://localhost:5000/api/products?page=${page - 1}` : null;

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

const getMyProducts = async (req, res) => {

    const { user_id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    
    try {
        
        // Search products by user id
        const createdBy = { user: user_id };
        const products = await Product.find({ createdBy }).skip(skip).limit(limit);
        if (!products.length) {
            return res.status(404).send({ msg: '❌ No products found' });
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
        res.status(500).send({ msg: '❌ Error getting products' });

    }

}

const getRandomProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 16 } }
        ]);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ msg: '❌ Error getting products' });
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
        res.status(500).send({ msg: '❌ Error getting products'});

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
        if (alreadyReviewed) return res.status(400).send({ msg: '❌ You already reviewed this product.' }); 
        if (product.createdBy.user == user_id) return res.status(400).send({ msg: '❌ You cannot review your own product.' }); 

        product.reviews.push(newReview);
        await product.save();
        res.status(200).send({ msg: '✅ Review sent' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error sending review' });

    }
}

//Update
const updateProduct = async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const newData = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`) || [];

    try {

        const product = await Product.findById(id); 
        if(product.createdBy.user != user_id) return res.status(400).send({ msg: '❌ You are not authorized to modify this product.' });

        if (images.length) {
            newData.images = [...product.images, ...images]; //Puede pasar a ser que el nuevo array de imagenes sobreescriba al que ya estaba
        }

        await Product.findByIdAndUpdate({_id: id}, newData);
        res.status(200).send({msg:'✅ Product updated' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error updating product'});
        
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
        res.status(200).send({ msg: '✅ Review deleted' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error deleting review' });

    }
}

const deleteProduct = async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;

    try {

        const product = await Product.findById(id); 
        if(product.createdBy.user != user_id) return res.status(400).send({ msg: '❌ You are not authorized to delete this product.' });

        await Product.findByIdAndDelete(id);

        res.status(200).send({ msg: '✅ Product deleted'});

    } catch (error) {
        res.status(500).send({ msg: '❌ Error deleting product' });
        
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
    deleteReview,
    deleteProduct
}