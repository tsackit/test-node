const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
)

categorySchema.method({
    transform() {
        const transformed = {}
        const fields = ['name', 'id']

        fields.forEach(field => {
            transformed[field] = this[field]
        });

        return transformed
    }
})

categorySchema.statics = {
    list({ page = 1, perPage = 10 }) {
        return this
            .find({})
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec()
    },

    async get(id) {
        let category

        if (mongoose.Types.ObjectId.isValid(id)) {
            category = await this.findById(id).exec()
        }
        if (category) {
            return category
        }

        throw new Error('category does exist')
    }
}

module.exports = mongoose.model('Category', categorySchema)