const mongo = require('./src/configs/mongo')
const app = require('./src/configs/express')
const { appPort } = require('./src/configs/vars')

mongo.connect()

app.listen(appPort, () => console.log('Server starting on: ', appPort))
