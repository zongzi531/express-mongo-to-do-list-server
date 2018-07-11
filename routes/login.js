const models = require('../mongo/models')
const units = require('../units')

const { userInfo } = models

const { response } = units

const path = '/login'

const callback = async (req, res, next) => {
  const { username, password } = req.body

  if (!username) { return res.json(response('NO_USERNAME')) }
  if (!password) { return res.json(response('NO_PASSWORD')) }

  const docs = await userInfo.find({ username }, (err, docs) => {
    if (err) { throw err }
    return docs
  })

  const { length } = docs

  if (length === 0) {
    return res.json(response('USERNAME_OR_PASSWORD_ERROR'))
  } else if (length === 1) {
    const [data] = docs
    if (username === data.username) {
      return res.json(response('LOGIN_SUCCESS'))
    } else {
      return res.json(response('USERNAME_OR_PASSWORD_ERROR'))
    }
  } else {
    return res.json(response('USER_ACCOUNT_ABNORMALITY'))
  }
}

module.exports.path = path
module.exports.callback = callback
