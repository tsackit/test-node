const { Router } = require('express')

const router = Router()

router.use('/auth', require('./customer.route'))

module.exports = router
