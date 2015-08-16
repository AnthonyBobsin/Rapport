var app = require('express')()
var server = app.listen(3000)
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var messagesController = require('./server/controllers/messagesController')

mongoose.connect('mongodb://localhost:27017/rapport')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.post('/message', function(req, res) {
  messagesController.create(req, res, io)
})

// TODO: Instead of catching message here, have button submit POST /message request
// and in controller emit message if saved successfully.
// io.on('connection', function(socket) {
//   console.log("a user connected")
//   socket.on('disconnect', function() {
//     console.log("user disconnected")
//   })
//   socket.on('chat message', function(msg) {
//     var message = new MessageModel()
//     message.text = msg
//     message.save(function(err) {
//       if (err) console.log(err)
//       else io.emit('chat message', msg)
//     })
//   })
// })

// http.listen(3000, function() {
//   console.log('listening on *:3000')
// })