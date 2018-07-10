const message = require('./message')

const response = (template = 'NO_TEMPLATE', response) => {
  return Object.assign(message[template], response)
}

module.exports = response
