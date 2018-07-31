const TodoList = require('../mongo/models').TodoList
const { response, params } = require('../units')
const Base64 = require('js-base64').Base64
const { check, validationResult } = require('express-validator/check')

const { STATUS_DEFAULT, COLORS_DEFAULT, COLORS } = params

const path = '/addTodo'

const validatior = [
  check('token', 'NO_TOKEN').exists({ checkFalsy: true }),
  check('color', 'NO_COLOR').exists({ checkFalsy: true }),
  check('color', 'COLOR_TYPE_ERROR').custom(value => COLORS.has(value)),
  check('content', 'NO_CONTENT').exists({ checkFalsy: true })
]

const callback = async (req, res, next) => {
  const [errors] = validationResult(req).array()

  if (errors) { res.json(response(errors.msg)); return next() }

  const { token, color = COLORS_DEFAULT, content } = req.body

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
module.exports.validatior = validatior
module.exports.callback = callback
