const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret')

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username == 'usuario' && password == '123456') {
        var token = jwt.sign({ username, role: 'admin' }, secret, {
            expiresIn: '1h'
        });
        res.send({ token });
    } else {
        res.status(403).send({ message: 'Error in username or password' });
    }
})

module.exports = router