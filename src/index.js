const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require("socket.io")

require('dotenv').config();
require('./database');

const functions = require('./services/messages/functions')

const app = express()
const server = http.createServer(app)
const io = new Server(server,  {
  cors : {
    origin : 'http://localhost:3000'
  }
})

app.use(cors())

//@INFO Se inicializa el server
const port = process.env.PORT || 4000

server.listen(port, () => console.log(`listen in ${port} port`))

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


app.post("/create-message", async function (req, res) {
  try {
    const {content, sender_id, receiver_id} = req?.body

    const response = await functions?.create(content, sender_id, receiver_id)

    if(!response) res.status(400).send('Error')

    res.status(response?.code).send(response?.content) 

  } catch (error) {
    console.log(error)
    res.status(400).send('Error')
  }
});

app.get("/get-messages", async function (req, res) {
  try {

    const response = await functions?.get()

    if(!response) res.status(400).send('Error')

    res.status(response?.code).send(response?.content) 

  } catch (error) {
    console.log(error)
    res.status(400).send('Error')
  }
});

//@INFO Se importan los servicios
// require('./services/index')


