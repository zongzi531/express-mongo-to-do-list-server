const UserInfo = require('../mongo/models').UserInfo
const response = require('../units').response
const Base64 = require('js-base64').Base64
const { check, validationResult } = require('express-validator/check')

const path = '/login'

const validatior = [
  check('username', 'NO_USERNAME').exists(),
  check('password', 'NO_PASSWORD').exists()
]

const callback = async (req, res, next) => {
  const [errors] = validationResult(req).array()

  if (errors) { res.json(response(errors.msg)); return next() }

  const { username, password } = req.body

  const docs = await UserInfo.find({ username }, (err, docs) => {
    if (err) { throw err }
    return docs
  })

  const { length } = docs

  if (length === 0) {
    res.json(response('USERNAME_OR_PASSWORD_ERROR'))
  } else if (length === 1) {
    const [data] = docs
    if ((username === data._doc.username) && (password === data._doc.password)) {
      res.json(response('LOGIN_SUCCESS', { token: Base64.encode(data._doc._id) }))
    } else {
      res.json(response('USERNAME_OR_PASSWORD_ERROR'))
    }
  } else {
    res.json(response('USER_ACCOUNT_ABNORMALITY'))
  }
  next()
}

module.exports.path = path
module.exports.validatior = validatior
module.exports.callback = callback
