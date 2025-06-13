const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('../utils/jwt.js');

async function register(req, res) { 
    const { name, lastname, email, password } = req.body;

    //Validate
    if (!email) return res.status(400).send({ msg: '❌ Email is required' });
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).send({ msg: '❌ Invalid email address' });
    if (!password) return res.status(400).send({ msg: '❌ Password is required' });
    if (password.length < 6) return res.status(400).send({ msg: '❌ Password must be at least 6 characters long' });

    //Create
    const user = new User({
        name,
        lastname,
        email: email.toLowerCase(),
        password,
        address: {
            street: '',
            city: '',
            country: ''
        },
        favorites: []
    })

    user.password = bcryptjs.hashSync(password, 10);

    //save in database
    try {
        await user.save();
        res.status(201).send({ msg: '✅ Registration successful' })
    } catch (error) {
        res.status(500).send({ msg: '❌ Registration failed. Please try again' })
    }
}

async function login(req, res) { 

    const { email, password } = req.body;

    //Validate
    if(!email) return res.status(400).send({ msg: '❌ Email is required' });
    if(!/\S+@\S+\.\S+/.test(email)) return res.status(400).send({ msg: '❌ Invalid email address' });
    if(!password) return res.status(400).send({ msg: '❌ Password is required' });
    if(password.length < 6) return res.status(400).send({ msg: '❌ Password must be at least 6 characters long' });

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if(!user) return res.status(404).send({ msg: '❌ User not found.' });

        const isValid = await bcryptjs.compare(password, user.password);
        if(!isValid) return res.status(400).send({ msg: '❌ Incorrect password' });

        const token = jwt.createAccessToken(user);
        res.status(200).send({ token: token });
        
    } catch (error) {
        res.status(500).send({ msg: '❌ Login failed. Please try again' });
    }

}


module.exports = {
    register,
    login
}