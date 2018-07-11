const models = require('../mongo/models')
const units = require('../units')

const { userInfo } = models

const { response } = units

const path = '/regist'

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
    const userinfo = new userInfo({
      username,
      password
    })
    await new Promise((resolve, reject) => {
      userinfo.save((err, docs) => {
        if (err) { throw err }
        resolve(docs)
      })
    })
    return res.json(response('REGISTED_SUCCESS'))
  } else if (length === 1) {
    return res.json(response('USER_REGISTED'))
  } else {
    return res.json(response('USER_ACCOUNT_ABNORMALITY'))
  }
}

module.exports.path = path
module.exports.callback = callback
