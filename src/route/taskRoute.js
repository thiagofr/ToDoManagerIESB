const router = require('express').Router()

const tasks = []

router.get('/tasks', (req, res) => {
    res.json(tasks)
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
    tasks.push(task)
    res.status(201)
    res.send(task)
})

router.get('/task/:taskId', (req, res) => {
    const task = tasks.find(t => t.id == req.params.taskId)

    if (task) {
        res.status(200)
        res.json(task)
    } else {
        res.sendStatus(404)
    }

})

router.put('/task/:taskId', (req, res) => {
    const { body } = req;
    const task = tasks.find(t => t.id == req.params.taskId);

    if (task) {
        task.title = body.title;
        task.resume = body.resume;
        task.isDone = body.isDone;
        task.isPriority = body.isPriority;
        res.send(task);
    } else {
        res.status(404);
        res.send();
    }
});

router.delete('/task/:taskId', (req, res) => {
    const task = tasks.find(t => t.id === req.params.taskId);
    if (task) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        res.send(task);
    } else {
        res.status(404);
        res.send();
    }
})

module.exports = router