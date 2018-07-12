const TodoList = require('../mongo/models').TodoList
const units = require('../units')
const Base64 = require('js-base64').Base64

const { response, params } = units

const { STATUS_DEFAULT, COLORS_DEFAULT, COLORS } = params

const path = '/addTodo'

const callback = async (req, res, next) => {
  const { token, color = COLORS_DEFAULT, content } = req.body

  if (!token) { res.json(response('NO_TOKEN')); return next() }
  if (!color) { res.json(response('NO_COLOR')); return next() }
  if (!COLORS.has(color)) { res.json(response('COLOR_TYPE_ERROR')); return next() }
  if (!content) { res.json(response('NO_CONTENT')); return next() }

  const userId = Base64.decode(token)

  const todolist = new TodoList({
    userId,
    color,
    content,
    status: STATUS_DEFAULT
  })
  const docs = await new Promise((resolve, reject) => {
    todolist.save((err, docs) => {
      if (err) { throw err }
      resolve(docs)
    })
  })
  res.json(response('ADD_TODO_SUCCESS', { todoId: Base64.encode(docs._doc._id) }))
  next()
}

module.exports.path = path
module.exports.callback = callback
