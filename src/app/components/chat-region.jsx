var React = require('react')

var Message = React.createClass({
  render: function() {
    var messageClass = "message"
    var messageUserClass = "message-user"
    if (this.props.currentUser == this.props.message.user){
      messageClass += " current-user"
      messageUserClass += " hide"
    }


    return (
      <div className={messageClass}>
        <span className="message-text">{this.props.message.text}</span>
        <span className={messageUserClass}>({this.props.message.user})</span>
      </div>
      )
  }
})

var ChatRegion = React.createClass({
  getInitialState: function() {
    return {
      messages: this.props.conversation.messages,
      user: '',
      message: ''
    }
  },

  sendMessage: function(e) {
    e.preventDefault()
    if (this.state.message && this.state.user) {
      var messageObj = {
        topic: this.props.conversation.topic,
        user: this.state.user,
        text: this.state.message,
        cid: this.props.conversation.cid
      }
      var view = this
      $.post('/message', messageObj)
        .done(function(data) {
          view.setState({message: ''})
        })
    }
  },

  updateUser: function(e) {
    this.setState({user: e.target.value})
  },

  updateMessage: function(e) {
    this.setState({message: e.target.value})
  },

  render: function() {
    var messages = this.state.messages.map(function(message, i) {
      return (
        <Message key={i} currentUser={this.state.user} message={message} />
        )
    }, this)

    var chatRegionClass = "chat-region " + (this.props.conversation.isActive ? "active" : "hide")

    return (
      <div className={chatRegionClass}>
        <div className="messages">{messages}</div>
        <form onSubmit={this.sendMessage} className="new-message-container">
          <input type="text" onChange={this.updateUser} value={this.state.user} className="message-user" placeholder="User" />
          <input type="text" onChange={this.updateMessage} value={this.state.message} className="message-input" placeholder="Message" />
          <button type="submit" className="message-submit">Send</button>
        </form>
      </div>
      )
  }
})

module.exports = ChatRegion