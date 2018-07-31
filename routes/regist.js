const UserInfo = require('../mongo/models').UserInfo
const response = require('../units').response
const { check, validationResult } = require('express-validator/check')

const path = '/regist'

const validatior = [
  check('username', 'NO_USERNAME').exists({ checkFalsy: true }),
  check('password', 'NO_PASSWORD').exists({ checkFalsy: true })
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
    const userinfo = new UserInfo({
      username,
      password
    })
    await new Promise((resolve, reject) => {
      userinfo.save((err, docs) => {
        if (err) { throw err }
        resolve(docs)
      })
    })
    res.json(response('REGISTED_SUCCESS'))
  } else if (length === 1) {
    res.json(response('USER_REGISTED'))
  } else {
    res.json(response('USER_ACCOUNT_ABNORMALITY'))
  }
  next()
}

module.exports.path = path
module.exports.validatior = validatior
module.exports.callback = callback
