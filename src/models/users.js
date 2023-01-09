const mongoose = require('mongoose')

const usersSchema = {
  username: String,
  pass : String
}; 

const users = mongoose.model("users", usersSchema);

module.exports = users