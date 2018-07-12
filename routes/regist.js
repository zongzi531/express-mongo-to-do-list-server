const UserInfo = require('../mongo/models').UserInfo
const response = require('../units').response

const path = '/regist'

const callback = async (req, res, next) => {
  const { username, password } = req.body

  if (!username) { res.json(response('NO_USERNAME')); next() }
  if (!password) { res.json(response('NO_PASSWORD')); next() }

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
module.exports.callback = callback
