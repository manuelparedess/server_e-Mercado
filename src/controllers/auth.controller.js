const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('../utils/jwt.js');

async function register(req, res) { 
    const { name, lastname, email, password } = req.body;

    //Validate
    if (!email) return res.status(400).send({ msg: '❌ El e-mail es obligatorio' });
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).send({ msg: '❌ Dirección de e-mail inválida' });
    if (!password) return res.status(400).send({ msg: '❌ La contraseña es obligatoria' });
    if (password.length < 6) return res.status(400).send({ msg: '❌ La contraseña debe tener 6 caracteres o más' });

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
        res.status(201).send({ msg: '✅ Registro exitoso' })
    } catch (error) {
        res.status(500).send({ msg: '❌ Error en el registro. Inténtalo de nuevo.' })
    }
}

async function login(req, res) { 

    const { email, password } = req.body;

    //Validate
    if (!email) return res.status(400).send({ msg: '❌ El e-mail es obligatorio' });
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).send({ msg: '❌ Dirección de e-mail inválida' });
    if (!password) return res.status(400).send({ msg: '❌ La contraseña es obligatoria' });
    if (password.length < 6) return res.status(400).send({ msg: '❌ La contraseña debe tener 6 caracteres o más' });

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if(!user) return res.status(404).send({ msg: '❌ Usuario no encontrado' });

        const isValid = await bcryptjs.compare(password, user.password);
        if(!isValid) return res.status(400).send({ msg: '❌ Contraseña incorrecta' });

        const token = jwt.createAccessToken(user);
        res.status(200).send({ token: token });
        
    } catch (error) {
        res.status(500).send({ msg: '❌ Error al iniciar sesión. Inténtalo de nuevo.' });
    }

}


module.exports = {
    register,
    login
}