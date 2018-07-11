const mongoose = require('mongoose')
const db = require('../index')

const USER_INFO = mongoose.Schema({
  username: String,
  password: String
})

const userInfo = db.model('user_info', USER_INFO)

module.exports.userInfo = userInfo
