const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

customerSchema.method({
    transform() {
        const transformed = {}
        const fields = ['email', 'id', 'token']

        fields.forEach(field => {
            transformed[field] = this[field]
        })

        return transformed
    }
})

customerSchema.statics = {
    async findByEmail(email) {
        try {
            let customer = await this.findOne({ email }).exec()

            if (customer) return customer

            throw new Error('This customer does exist')
        } catch (error) {
            throw new Error(error)
        }
    },
    async get(id) {
        try {
            let customer

            if (mongoose.Types.ObjectId.isValid(id)) {
                customer = await this.findById(id).exec()
            }

            if (customer) return customer

            throw new Error('This customer does exist')
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mongoose.model('Customer', customerSchema)
