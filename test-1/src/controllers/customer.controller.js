const Customer = require('../models/customer.model')
const crypto = require('crypto')

exports.load = async (req, res, next, id) => {
    try {
        const customer = await Customer.get(id)
        req.locals = { customer }
        return next()
    } catch (error) {
        return next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const token = `${crypto.randomBytes(40).toString('hex')}`
        
        const customer = new Customer({ ...req.body, token })
        const savedCustomer = await customer.save()
        res.json(savedCustomer.transform())
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const customer = await Customer.findByEmail(req.body.email)
        if (customer.password == req.body.password) res.json(customer.transform())
    } catch (error) {
        next(error)
    }
}

exports.validateToken = async (req, res, next) => {
    try {
        const xAccessToken = req.headers['x-access-token']
        if (xAccessToken) {
            console.log({req: req.locals.customer.token, loc: xAccessToken})
            
            if (req.locals.customer.token === xAccessToken) {
                return next()
            }
        }

        throw new Error('Not valid token')
    } catch (error) {
        return next(error)
    }
}

exports.get = async (req, res, next) => res.json(req.locals.customer.transform())

exports.update = async (req, res, next) => {
    const customer = Object.assign(req.locals.customer, req.body)

    customer
        .save()
        .then(savedCustomer => res.json(savedCustomer.transform()))
        .catch(error => next(error))
}

exports.delete = async (req,res, next) => {
    const {customer} = req.locals

    customer
        .remove()
        .then(() => res.status(304).end())
        .catch(error => next(error))
}
