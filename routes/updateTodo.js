const TodoList = require('../mongo/models').TodoList
const units = require('../units')
const Base64 = require('js-base64').Base64
const { check, validationResult } = require('express-validator/check')

const { response, params } = units

const { COLORS, STATUS } = params

const path = '/updateTodo'

const validatior = [
  check('token', 'NO_TOKEN').exists({ checkFalsy: true }),
  check('todoId', 'NO_TODOID').exists({ checkFalsy: true }),
  check('color', 'NO_COLOR').exists({ checkFalsy: true }),
  check('color', 'COLOR_TYPE_ERROR').custom(value => COLORS.has(value)),
  check('content', 'NO_CONTENT').exists({ checkFalsy: true }),
  check('status', 'NO_STATUS').exists({ checkFalsy: true }),
  check('status', 'STATUS_TYPE_ERROR').custom(value => STATUS.has(value))
]

const callback = async (req, res, next) => {
  const [errors] = validationResult(req).array()

  if (errors) { res.json(response(errors.msg)); return next() }

  const { token, todoId, color, content, status } = req.body

  const userId = Base64.decode(token)
  const _id = Base64.decode(todoId)

  const docs = await TodoList.update({ userId, _id }, { color, content, status }, {}, (err, docs) => {
    if (err) { throw err }
    return docs
  })

  res.json(response('UPDATE_SUCCESS', docs))
  next()
}

module.exports.path = path
module.exports.validatior = validatior
module.exports.callback = callback
