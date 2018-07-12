const mongoose = require('mongoose')
const db = require('../index')

const USER_INFO = mongoose.Schema({
  username: String,
  password: String
})

const UserInfo = db.model('user_info', USER_INFO)

const TODO_LIST = mongoose.Schema({
  userId: String,
  color: String,
  content: String,
  status: String
})

const TodoList = db.model('todo_list', TODO_LIST)

module.exports.UserInfo = UserInfo
module.exports.TodoList = TodoList
