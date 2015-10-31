var Conversation = require(__dirname + '/../models/conversation')

var ConversationsController = {
  create: function(req, res, io) {
    var conversation = new Conversation(req.body)
    conversation.save(function(err) {
      if (err) console.log(err)
      else {
        console.log("Saved a conversation")
        io.emit('conversation', conversation)
        res.sendStatus(200)
      }
    })
  }
}

module.exports = ConversationsController