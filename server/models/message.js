var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
  text: { type: String },
  user: { type: String }
})
var Message = mongoose.model('message', MessageSchema)

module.exports = Message