const jwt = require('../utils/jwt.js');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyToken = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({ msg: '❌ Token de autenticación no proporcionado' })
    }

    try {

        //info
        const token = req.headers.authorization;
        const payload = jwt.decode(token);

        const { exp } = payload;
        const currentDate = new Date().getTime();

        if (exp <= currentDate) {
            return res.status(401).send({ msg: '❌ La sesión ha expirado. Por favor, vuelve a iniciar sesión.' })
        }

        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).send({ msg: '❌ Token de autenticacion inválido.' });
    }
}

const verifyGoogleToken = async (req, res, next) => {

    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        req.user = payload;
        next();

    } catch (error) {
        res.status(401).json({ msg: '❌ Token de Google inválido' + error });
    }
}

module.exports = {
    verifyToken,
    verifyGoogleToken
};