const bodyParser = require('body-parser')
const taskRoute = require('../route/taskRoute')

module.exports = (app) => {
    
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    app.use(taskRoute)

}