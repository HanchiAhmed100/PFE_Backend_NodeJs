// Initialisation d'express
const express = require("express")
const app = express()



let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

// Mise en palce de l'envirement 
let cors  = require('cors')
let bodyParser = require('body-parser')

app.use(cors());

// Middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//web socket 
io.sockets.on('connection', function(socket){
  console.log('an user connected');

  socket.on('CODE', function(code,guichet,agence_id){
    io.emit('CHANGED', code , guichet ,agence_id);
  });


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



// Mise en plase des Route
let Client = require('./Router/ClientRouter')
let AdminAuth = require('./Router/AdminAuthRouter')
let R = require("./reservation")
let Guichet = require("./Router/GuichetRouter")
let Dashboard = require("./Router/DashboardRouter")

// Initialisation du Router
app.use('/Api/Client', Client )
app.use('/Api/Auth', AdminAuth )
app.use('/Api/Guichet', Guichet )
app.use('/Api/Reservation', R )
app.use('/Api/Dashboard', Dashboard )


let PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})