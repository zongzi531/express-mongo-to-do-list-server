const express = require('express')
const router = express.Router()

const post = (modulesPath) => {
  const r = require(modulesPath)
  router.post(r.path, r.callback)
}

post('./regist')
post('./login')
post('./addTodo')
post('./getTodoList')
post('./updateTodo')

module.exports = router
