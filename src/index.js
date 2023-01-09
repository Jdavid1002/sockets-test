const app = require('./server');
const io = require('./socket');
require('dotenv').config();
require('./database');

//Settings

const port = process.env.PORT || 4000

app.set('port', port)

app.listen(app.get('port'), () => console.log(`listen in ${port} port`))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))



io.on('connection', (socket) => {
  
  socket.on('chat message', (message, id) => {
    //@INFO save message in database.
    //@INFO Emit message at users.
    io.emit('chat message', message)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
