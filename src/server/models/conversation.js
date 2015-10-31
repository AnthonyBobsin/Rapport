var mongoose = require('mongoose')

var ConversationSchema = new mongoose.Schema({
  topic: { type: String },
  messages: { type: Array }
})

var Conversation = mongoose.model('conversation', ConversationSchema)

module.exports = Conversation