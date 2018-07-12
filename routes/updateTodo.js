const TodoList = require('../mongo/models').TodoList
const units = require('../units')
const Base64 = require('js-base64').Base64

const { response, params } = units

const { COLORS, STATUS } = params

const path = '/updateTodo'

const callback = async (req, res, next) => {
  const { token, todoId, color, content, status } = req.body

  if (!token) { res.json(response('NO_TOKEN')); return next() }
  if (!todoId) { res.json(response('NO_TODOID')); return next() }
  if (!color) { res.json(response('NO_COLOR')); return next() }
  if (!COLORS.has(color)) { res.json(response('COLOR_TYPE_ERROR')); return next() }
  if (!content) { res.json(response('NO_CONTENT')); return next() }
  if (!status) { res.json(response('NO_STATUS')); return next() }
  if (!STATUS.has(status)) { res.json(response('STATUS_TYPE_ERROR')); return next() }

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
module.exports.callback = callback
