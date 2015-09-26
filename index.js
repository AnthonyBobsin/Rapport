var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var meetingsController = require(__dirname + '/src/server/controllers/meetingsController')
var conversationsController = require(__dirname + '/src/server/controllers/conversationsController')
var messagesController = require(__dirname + '/src/server/controllers/messagesController')

// SETUP
mongoose.connect('mongodb://localhost:27017/rapport')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/js', express.static(__dirname + '/src/client/js'))
app.use('/vendor', express.static(__dirname + '/src/vendor'))
app.use('/build', express.static(__dirname + '/build'))

// API ROUTES
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/client/index.html')
})

// REST
// Meetings resource
app.get('/meetings', function(req, res) {
})
app.post('/meetings', function(req, res) {
  meetingsController.create(req, res, io)
})
// Conversations resource
app.post('/conversations', function(req, res) {
  conversationsController.create(req, res, io)
})
// Messages resource
app.post('/messages', function(req, res) {
  messagesController.create(req, res, io)
})

// Start server
http.listen(3000, function() {
  console.log('I\'m listening on *:3000')
})