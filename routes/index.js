const express = require('express')
const router = express.Router()

const regist = require('./regist')
router.post(regist.path, regist.callback)

const login = require('./login')
router.post(login.path, login.callback)

module.exports = router
