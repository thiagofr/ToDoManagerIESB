const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret')

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username == 'usuario' && password == 'teste123') {
        var token = jwt.sign({ username, role: 'admin' }, secret, {
            expiresIn: '1h'
        });
        res.send({ auth: true, token });
    } else {
        res.status(403).send({ auth: false, message: 'usuário inválido' });
    }
})

module.exports = router