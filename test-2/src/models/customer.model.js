const mongoose = require('mongoose')
const Transaction = require('./transacion.model')
const { omitBy, isNil } = require('lodash')

const customerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
            required: true
        }
    }
)
customerSchema.method({
    async transform() {
        let transformed = {}
        const fields = ['email', 'password', 'category', 'id']
        
        fields.forEach(field => {
            transformed[field] = this[field]
        });

        const transactionQuery = await Transaction.list({customer: this._id})
        const transactions = transactionQuery.map(x => x.transform())

        transformed = {...transformed, transactions}
        
        return transformed
    }
})

customerSchema.statics = {
    list({ page = 1, perPage = 10, category }) {
        const options = omitBy({ category }, isNil)
        if (!mongoose.Types.ObjectId.isValid(options.category)) throw new Error('Category is not objectid')
        return this
            .find(options)
            .populate('category')
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec()
    },

    async get(id) {
        let customer

        if (mongoose.Types.ObjectId.isValid(id)) {
            customer = await this.findById(id).exec()
        }
        if (customer) {
            return customer
        }

        throw new Error('customer does exist')
    }
}
module.exports = mongoose.model('Customer', customerSchema)
