const express = require('express')
const router = express.Router()

const regist = require('./regist')
router.post(regist.path, regist.callback)

module.exports = router
