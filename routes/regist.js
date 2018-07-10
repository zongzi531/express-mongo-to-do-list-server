const mongoose = require('mongoose')
const db = require('../mongo')
const units = require('../units')

const { response } = units

const path = '/regist'

const regist = mongoose.Schema({
  username: String,
  password: String
})

const callback = (req, res, next) => {
  const { username, password } = req.body

  const MRegist = db.model('user_info', regist)

  MRegist.find({
    username
  }, (err, docs) => {
    if (err) {
      return err
    }
    const { length } = docs
    if (length === 0) {
      console.log('you can registing.')
      const mregist = new MRegist({
        username,
        password
      })
      mregist.save((err, docs) => {
        if (err) {
          return err
        }
        res.json(response('REGISTED_SUCCESS', docs._doc))
      })
    } else if (length === 1) {
      console.log('user was registed.')
    } else {
      console.log('server error.')
    }
  })
}

module.exports.path = path
module.exports.callback = callback
