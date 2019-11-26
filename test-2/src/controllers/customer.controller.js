const Customer = require('../models/customer.model')

exports.list = async (req, res, next) => {
    try {
        const customers = await Customer.list(req.query)
        const transformedCustomers = await Promise.all(customers.map(x => x.transform()))
        res.json(transformedCustomers)
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const customer = new Customer(req.body)
        const savedCustomer = await customer.save()
        const transformedCustomer = await savedCustomer.transform()
        
        res.json(transformedCustomer)
    } catch (error) {
        next(error)
    }
}
