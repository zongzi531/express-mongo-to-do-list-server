const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const router = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))

app.use(router)

require('./mongo')

module.exports = app
