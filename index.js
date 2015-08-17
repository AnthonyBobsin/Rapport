var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var browserify = require('browserify')
var React = require('react/addons')
var jsx = require('node-jsx')
var messagesController = require(__dirname + '/src/server/controllers/messagesController')

// SETUP
mongoose.connect('mongodb://localhost:27017/rapport')
jsx.install()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/js', express.static(__dirname + '/src/client/js'))
app.use('/css', express.static(__dirname + '/src/client/css'))
app.use('/vendor', express.static(__dirname + '/src/vendor'))

// API ROUTES
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/client/chat.html')
})

app.post('/message', function(req, res) {
  messagesController.create(req, res, io)
})


http.listen(3000, function() {
  console.log('I\'m listening on *:3000')
})