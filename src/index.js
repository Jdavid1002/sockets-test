const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require("socket.io")

require('dotenv').config();
require('./database');

const connection = require('./sockets/connection')
const services = require('./services/index')

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


//@INFO Se importa la conexion y funcionalidad de los sockets.
connection?.connection(io)


//@INFO Se importan los servicios.
services?.services(app)