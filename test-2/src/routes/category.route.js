const { Router } = require('express')
const Category = require('../models/category.model')

const router = Router()

const ctrl = {
    async update(req, res, next) {
        try {
            const category = new Category(req.body)
            const savedCategory = await category.save()
            res.json(savedCategory.transform())
        } catch (error) {
            next(error)
        }
    }
}

router
    .route('/')
    .post(ctrl.update)

module.exports = router
