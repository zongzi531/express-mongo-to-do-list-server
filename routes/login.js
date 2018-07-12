const UserInfo = require('../mongo/models').UserInfo
const response = require('../units').response
const Base64 = require('js-base64').Base64

const path = '/login'

const callback = async (req, res, next) => {
  const { username, password } = req.body

  if (!username) { res.json(response('NO_USERNAME')); return next() }
  if (!password) { res.json(response('NO_PASSWORD')); return next() }

  const docs = await UserInfo.find({ username }, (err, docs) => {
    if (err) { throw err }
    return docs
  })

  const { length } = docs

  if (length === 0) {
    res.json(response('USERNAME_OR_PASSWORD_ERROR'))
  } else if (length === 1) {
    const [data] = docs
    if (username === data._doc.username) {
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
module.exports.callback = callback
