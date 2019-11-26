const path = require('path')

require('dotenv-safe').config({
    sample: path.join(__dirname, '../../.env.sample'),
    path: path.join(__dirname, '../../.env')
})

module.exports = {
    nodeEnv: process.env.NODE_ENV,
    appPort: process.env.APP_PORT,
    mongoUri: process.env.MONGO_URI
}
