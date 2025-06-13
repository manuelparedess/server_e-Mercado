const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    images: [String], //URL
    reviews: [
        {
            user: String, //Id
            rating: Number,
            text: String,
            createdAt: Date
        }
    ],
    createdBy: {
        user: String, //Id
    },
});

module.exports = mongoose.model('Product', ProductSchema);
