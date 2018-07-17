const express = require('express')
const router = express.Router()

const post = (modulesPath) => {
  const { path, validatior = [], callback } = require(modulesPath)
  router.post(path, validatior, callback)
}

post('./regist')
post('./login')
post('./addTodo')
post('./getTodoList')
post('./updateTodo')

module.exports = router
