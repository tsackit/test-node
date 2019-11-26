const { Router } = require('express')
const ctrl = require('../controllers/customer.controller')

const router = Router()

router
    .route('/')
    .get(ctrl.list)
    .post(ctrl.create)
    
module.exports = router
