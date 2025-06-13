const jwt = require('../utils/jwt.js');

const verifyToken = async (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(403).send({ msg: '❌ Authentication token not provided' })
    }

    try {

        //info
        const token = req.headers.authorization;
        const payload = jwt.decode(token);

        const { exp } = payload;
        const currentDate = new Date().getTime();

        if(exp <= currentDate) {
            return res.status(401).send({ msg: '❌ Session has expired. Please log in again.' }) 
        }
 
        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).send({ msg: '❌ Invalid authentication token.' });
    }
}

module.exports = {
    verifyToken
};