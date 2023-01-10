const functions = require('../services/messages/functions')

const createConnectionSocket = (io) => {
  io.on('connection', (socket) => {
  
    socket.on('chat-message', async (content, sender_id, receiver_id) => {
      
      //@INFO save message in database.
      const response = await functions?.create(content, sender_id, receiver_id)
  
      //@INFO Validamos que se creo el mensaje para emitir un error en caso contrario.
      if(!response){
        io.emit('chat-message', {
          status : 'error',
          code : 400,
          error : response
        })
        return
      }
  
      //@INFO Emitimos un codigo correcto y el mensaje.
      io.emit('chat-message', {
        status : 'success',
        code : 200,
        error : response
      })
    })
    
    socket.on('disconnect', () => {
      
    })
  })
}

exports.connection = createConnectionSocket;