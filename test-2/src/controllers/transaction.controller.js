const Transaction = require('../models/transacion.model')

exports.load = async (req, res, next, id) => {
    try {
        const transaction = await Transaction.get(id)
        req.locals = { transaction }
        next()
    } catch (error) {
        next(erro)
    }
}
exports.update = async (req, res, next) => {
    const transaction = Object.assign(req.locals.transaction, req.body)

    transaction
        .save()
        .then(savedTransaction => res.json(savedTransaction.transform()))
        .catch(error => next(error))
}

exports.create = async (req, res, next) => {
    try {
        const transaction = await Transaction(req.body)
        const savedTransaction = await transaction.save()
        const transformedTransaction = await savedTransaction.transform()
        res.json(transformedTransaction)
    } catch (error) {
        next(error)
    }
}

