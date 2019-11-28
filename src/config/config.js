const bodyParser = require('body-parser')
const taskRoute = require('../route/taskRoute')
const { tokenJWTVerify } = require('../middleware/jwtUtils')
const TaskDAO = require('../dao/taskDAO')

const dao = new TaskDAO()

module.exports = (app) => {
    
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    app.use(tokenJWTVerify)

    app.use(taskRoute)

    return new Promise((resolve, reject) => {
        dao.init()
        .then(resolve)
        .catch(reject)
    })

}