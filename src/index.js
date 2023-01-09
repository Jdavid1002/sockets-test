const app = require('./server');

require('dotenv').config();
require('./database');

//@INFO Se inicializa el server
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listen in ${port} port`))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))


//@INFO Se importan los servicios
require('./services/index')

//@INFO Se importan los sockets
require('./sockets/connection');