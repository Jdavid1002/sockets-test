const io = require('../socket')
const create = require('../services/messages/functions')


io.on('connection', (socket) => {
  
  socket.on('chat message', (content, sender_id, receiver_id) => {
    console.log(content, sender_id, receiver_id)
    //@INFO save message in database.
    //@INFO Emit message at users.
    io.emit('chat message', content)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
