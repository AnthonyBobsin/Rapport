var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/rapport')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

var MessageSchema = new Schema({
  text: { type: String }
})
var MessageModel = mongoose.model('message', MessageSchema)
MessageModel.remove().exec() // For now clear messages db on server load.

io.on('connection', function(socket) {
  console.log("a user connected")
  socket.on('disconnect', function() {
    console.log("user disconnected")
  })
  socket.on('chat message', function(msg) {
    var message = new MessageModel()
    message.text = msg
    message.save(function(err) {
      if (err) console.log(err)
      io.emit('chat message', msg)
    })
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})