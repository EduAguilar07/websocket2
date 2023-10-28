//import { create_roles } from './components/role/initialSetup'

const express = require('express')
const body_parser = require('body-parser')

let app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const config = require('./config')
const userRoutes = require('./network/routes')
const db = require('./db')

db( config.DB_URL )

//create_roles()
app.use( body_parser.json() )
app.use( body_parser.urlencoded({extended: false}) )
app.use('/', express.static('public'))

app.use((req, res, next) => {
    req.io = io;
    next();
  });

routes( app )

io.on('connection', function(socket){
    console.log('Nuevo cliente conectado.')
})

server.listen( config.PORT, () => {
console.log(`La aplicacion se encuentra arriba en http://localhost:${config.PORT}/`);
});
