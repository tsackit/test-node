const { Router } = require('express')
const ctrl = require('../controllers/customer.controller')
const validate = require('express-validation')
const validator = require('../validators/customer.validator')

const router = Router()

router.param('customerId', ctrl.load)

router
    .route('/register')
    .post(ctrl.register)

router
    .route('/login')
    .post(ctrl.login)

router
    .route('/:customerId')
    .get(validate(validator.update), ctrl.validateToken, ctrl.get)
    .put(validate(validator.update), ctrl.validateToken, ctrl.update)
    .delete(validate(validator.update), ctrl.validateToken, ctrl.delete)

module.exports = router
