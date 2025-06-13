const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        unique: true,
        type: String,
    },
    password: String,
    address: {
        street: String,
        city: String,
        country: String
    },
    favorites: [
        {
            product: String //Id
        }
    ],
});

module.exports = mongoose.model('User', UserSchema);