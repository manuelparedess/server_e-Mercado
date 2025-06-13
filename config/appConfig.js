const connectDB = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Server
const app = express();

//Database
connectDB();

//Configuracion
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//ROUTES

//Auth
const authRoutes = require('../src/router/auth.router.js');
app.use('/api/auth', authRoutes);
const userRoutes = require('../src/router/user.router.js');
app.use('/api/user', userRoutes);

//Product
const productRoutes = require('../src/router/product.router.js');
app.use('/api/product', productRoutes);




module.exports = app;
