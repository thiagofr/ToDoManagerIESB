const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret')

const tokenJWTVerify = (req, res, next) => {
    if (req.url == '/login') {
        next();
    } else {
        const token = req.headers['x-access-token'];
        try {
            jwt.verify(token, secret);
            next();
        } catch (e) {
            res.status(500).send({ message: 'token invalido' })
        }
    }
}

module.exports = {
    tokenJWTVerify
}