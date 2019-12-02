const router = require('express').Router()
const TaskDAO = require('../dao/taskDAO')

const dao = new TaskDAO()

router.get('/tasks', (_, res) => {
    dao.listAll()
        .then((tasks) => response.send(tasks))
        .catch((err) => response.status(500).send(err))
})

router.post('/task', (req, res) => {
    const { body } = req
    const task = {
        id: Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    }

    dao.insert(task)
        .then(() => res.status(201).json(data))
        .catch(err => res.status(500).send(err))

})

router.get('/task/:taskId', (req, res) => {

    dao.findTaskById(req.params.taskId)
        .then(task => {
            if (task) {
                res.status(200)
                    .json(task)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/task/:taskId', (req, res) => {
    const { body } = req;
    const task = {
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    }

    dao.insert(task)
        .then(_ => res.json(task))
        .catch(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(500)
            }
        })

});

router.delete('/task/:taskId', (req, res) => {
    dao.remove(req.params.taskId)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
})

module.exports = router