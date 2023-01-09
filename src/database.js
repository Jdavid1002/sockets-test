const mongoose = require('mongoose')


const MONGODB_URI = `mongodb://${process.env.NOTES_APP_MONGODB_HOST}/${process.env.NOTES_APP_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

require('./models/index')