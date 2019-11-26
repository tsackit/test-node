const mongoose = require('mongoose')
const { mongoUri } = require('./vars')

mongoose.connection.on('error', (error) => {
    console.error(error)
    process.exit(-1)
})

exports.connect = () => {
    mongoose.connect(mongoUri, {
        keepAlive: 1,
        useNewUrlParser: true
    })
    return mongoose.connection
}
