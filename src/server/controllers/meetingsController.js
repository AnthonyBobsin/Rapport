var Meeting = require(__dirname + '/../models/meeting')

var MeetingsController = {
  create: function(req, res, io) {
    var meeting = new Meeting(req.body)
    meeting.save(function(err) {
      if (err) console.log(err)
      else {
        console.log("Saved a meeting")
        io.emit('meeting', meeting)
        res.sendStatus(200)
      }
    })
  }
}

module.exports = MeetingsController