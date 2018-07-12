const TodoList = require('../mongo/models').TodoList
const units = require('../units')
const Base64 = require('js-base64').Base64

const { response, params } = units

const { UNFINISHED, FINISHED } = params

const path = '/getTodoList'

const callback = async (req, res, next) => {
  const { token } = req.body

  if (!token) { res.json(response('NO_TOKEN')); return next() }

  const userId = Base64.decode(token)

  const docs = await TodoList.find({ userId }, (err, docs) => {
    if (err) { throw err }
    return docs
  })

  const finishedList = []
  const unfinishedList = []

  for (let i of docs) {
    const { _id, color, content, status } = i
    if (i.status === UNFINISHED) {
      unfinishedList.push({
        todoId: Base64.encode(_id),
        color,
        content,
        status
      })
    }
    if (i.status === FINISHED) {
      finishedList.push({
        todoId: Base64.encode(_id),
        color,
        content,
        status
      })
    }
  }

  res.json(response('SUCCESS', { finishedList, unfinishedList }))
  next()
}

module.exports.path = path
module.exports.callback = callback
