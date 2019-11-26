const mongoose = require('mongoose')
const { isNil, omitBy } = require('lodash')

const transactionSchema = new mongoose.Schema(
    {
        products: {
            type: Array,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        customer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Customer',
            required: true
        },
        status: {
            type: String,
            enum: ['consolidado', 'no consolidado'],
            default: 'no consolidado'
        }
    },
    {
        timestamps: true
    }
)

transactionSchema.method({
    transform() {
        const transformed = {}
        const fields = ['customer', 'total', 'customer', 'id', 'status']

        fields.forEach(field => {
            transformed[field] = this[field]
        });

        return transformed
    }
})

transactionSchema.statics = {
    list({ page = 1, perPage = 10, customer }) {
        const options = omitBy({ customer }, isNil)
        return this
            .find(options)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec()
    },
    async get(id) {
        let transaction

        if (mongoose.Types.ObjectId.isValid(id)) {
            transaction = await this.findById(id).exec()
        }
        if (transaction) {
            return transaction
        }

        throw new Error('Transaction does exist')
    }
}

module.exports = mongoose.model('Transaction', transactionSchema)
