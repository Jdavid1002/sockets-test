const messageService = require('./messages/messagesService')

const services = (app) => {
  messageService?.Service(app)
}

exports.services = services;