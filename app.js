const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const mongoose = require('mongoose')
//const io = require('socket.io')(server);
//const port = require('./private/port.js')

//Settings
mongoose.connect('mongodb://localhost/SAA-database',{
	useNewUrlParser: true
})
.then(db => console.log('DB in connected'))
.catch(err => console.erro(err))
app.set('port', process.env.PORT || 3200)

//middlewares

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

//routes
app.use('/users', require('./routes/users.js'))
app.use('/tickets', require('./routes/tickets.js'))
app.use('/clients', require('./routes/clients.js'))
//Static files 

app.use('/static', express.static(__dirname + '/public'));

// server in listened
// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(options, app);

server.listen(app.get('port'), () => {
	console.log('Server on port: ', app.get('port'))
});