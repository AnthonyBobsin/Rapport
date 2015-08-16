var Message = require('../models/message')

module.exports.create = function(req, res, io) {
  var message = new Message(req.body)
  message.save(function(err) {
    if (err) console.log(err)
    else {
      io.emit('message', req.body)
      res.sendStatus(200)
    }
  })
}