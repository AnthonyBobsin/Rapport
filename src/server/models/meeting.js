var mongoose = require('mongoose')

var MeetingSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  conversations: { type: Array }
})

var Meeting = mongoose.model('meeting', MeetingSchema)

module.exports = Meeting