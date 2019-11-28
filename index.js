const Express = require('express')
const app = Express()
const setup = require('./src/config/config')

setup(app)
    .then(() => {
        const port = 3000
        app.listen(port, () => console.log(`Server rodando na porta ${port}`))
    })
    .catch(err => console.log('Servidor nao iniciado por erro', err))