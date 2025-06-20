const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const getUser = async (req, res) => {

    try {
        const { user_id } = req.user;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).send({ msg: '❌ User not found' });
        }

        return res.status(200).send(user);

    } catch (error) {
        res.status(500).send({ msg: '❌ Invalid user' });
    }
}

const getUserById = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ msg: '❌ User not found' });
        }

        const data = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            address: user.address,
        }

        return res.status(200).send(data);

    } catch (error) {
        res.status(500).send({ msg: '❌ Invalid user' });
    }
}

const addFavorite = async (req, res) => {

    //user
    const { user_id } = req.user;
    const { id } = req.params;

    const newFavorite = {
        product: id
    }

    try {
        const user = await User.findById(user_id);

        const alreadyFavorite = user.favorites.find((fav) => fav.product === id);
        if (alreadyFavorite) return res.status(400).send({ msg: '❌ This product is already a favorite.' }); 

        user.favorites.push(newFavorite);
        await user.save();
        res.status(200).send({ msg: '✅ Favorite saved' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error saving favorite' + error });

    }
}

const deleteFavorite = async (req, res) => {

    //user
    const { user_id } = req.user;
    const { id } = req.params;

    try {
        const user = await User.findById(user_id);
        user.favorites = user.favorites.filter((fav) => fav.product !== id);

        await user.save();
        res.status(200).send({ msg: '✅ Favorite deleted' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error deleting favorite' });

    }
}

const updateUser = async (req, res) => {

    const { user_id } = req.user;
    const newData = req.body;

    //Update
    try {
        await User.findByIdAndUpdate({ _id: user_id }, newData);
        res.status(200).send({ msg: '✅ User updated' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error updating user' });

    }
}

const updatePassword = async (req, res) => {
    const { user_id } = req.user;
    const { password, newPassword } = req.body;

    if (!password) return res.status(400).send({ msg: '❌ La contraseña es requerida' });
    if (!newPassword) return res.status(400).send({ msg: '❌ No hay nueva contraseña' });
    if (newPassword.length < 6) return res.status(400).send({ msg: '❌ La nueva contraseña debe tener 6 caracteres o más' });

    try {
        const user = await User.findById(user_id);

        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) return res.status(400).send({ msg: '❌ Contraseña incorrecta' });

        await User.findByIdAndUpdate({ _id: user_id }, {password: bcryptjs.hashSync(newPassword, 10)});

        res.status(200).send({ msg: '✅ Password updated' });

    } catch (error) {
        res.status(500).send({ msg: '❌ Error updating password' });
    }
}

const deleteUser = async (req, res) => {

    const { user_id } = req.user;

    try {
        await User.findByIdAndDelete(user_id);
        
        res.status(200).send({ msg: '✅ User deleted'});

    } catch (error) {
        res.status(500).send({ msg: '❌ Error deleting user' });
        
    }
}



module.exports = {
    getUser,
    getUserById,
    addFavorite,
    deleteFavorite,
    updateUser,
    updatePassword,
    deleteUser
}


