const Joi = require('joi')

module.exports = {
    update: {
        headers: {
            'x-access-token': Joi.string().required()
        }
    }
}
