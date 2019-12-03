const bodyParser = require('body-parser')
const indexRoute = require('../route/index')
const taskRoute = require('../route/taskRoute')
const loginRoute = require('../route/loginRoute')
const { tokenJWTVerify } = require('../middleware/jwtUtils')
const TaskDAO = require('../dao/taskDAO')

const dao = new TaskDAO()

module.exports = (app) => {
    
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    app.use(indexRoute)
    
    app.use(tokenJWTVerify)

    app.use(taskRoute)

    app.use(loginRoute)

    return new Promise((resolve, reject) => {
        dao.init()
        .then(resolve)
        .catch(reject)
    })

}