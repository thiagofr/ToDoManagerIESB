const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ 'message': 'ok' })
})

module.exports = router