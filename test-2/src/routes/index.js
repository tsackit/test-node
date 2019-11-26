const { Router } = require('express')

const router = Router()

router.use('/customers', require('./customer.route'))
router.use('/transactions', require('./transaction.route'))
router.use('/category', require('./category.route'))

module.exports = router
