const mongoose = require('mongoose')

const opts = { useNewUrlParser: true }

const address = 'localhost'
const port = 27017
const path = 'todo'

mongoose.connect(`mongodb://${address}:${port}/${path}`, opts)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error.'))

db.once('open', () => {
  console.log(`connecting mongodb://${address}:${port}/${path} success.`)
})

module.exports = db
