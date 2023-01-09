const mongoose = require('mongoose')

const messagesSchema = {
  content: String,
  sender_id : String,
  receiver_id : String
}; 

const messages = mongoose.model("messages", messagesSchema);

module.exports = messages