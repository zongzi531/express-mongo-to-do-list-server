const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const router = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

app.use('/', express.static('views'))
app.use(router)

require('./mongo')

module.exports = app
