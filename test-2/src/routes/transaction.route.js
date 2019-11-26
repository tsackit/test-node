const { Router } = require('express')
const ctrl = require('../controllers/transaction.controller')

const router = Router()

router.param('trId', ctrl.load)

router
    .route('/')
    .post(ctrl.create)

router
    .route('/:trId')
    .put(ctrl.update)

module.exports = router
