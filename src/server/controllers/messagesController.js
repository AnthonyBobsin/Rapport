var Message = require(__dirname + '/../models/message')

var MessagesController = {
  create: function(req, res, io) {
    var message = new Message(req.body)
    message.save(function(err) {
      if (err) console.log(err)
      else {
        console.log("Saved a message")
        io.emit('message', message)
        res.sendStatus(200)
      }
    })
  }
}

module.exports = MessagesController