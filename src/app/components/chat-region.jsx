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
      messages: this.props.topic.messages,
      user: '',
      message: ''
    }
  },

  _sendMessage: function(e) {
    e.preventDefault()
    if (this.state.message && this.state.user) {
      var messageObj = {
        topic: this.props.topic.title,
        user: this.state.user,
        text: this.state.message,
        tid: this.props.topic.tid
      }
      var view = this
      $.post('/message', messageObj)
        .done(function(data) {
          view.setState({message: ''})
        })
    }
  },

  _updateUser: function(e) {
    this.setState({user: e.target.value})
  },

  _updateMessage: function(e) {
    this.setState({message: e.target.value})
  },

  render: function() {
    var chatRegionClass = "chat-region " + (this.props.topic.isActive ? "active" : "hide")

    return (
      <div className={chatRegionClass}>
        <div className="messages">
          {this.state.messages.map(function(message, i) {
            return <Message key={i} currentUser={this.state.user} message={message} />
          }, this)}
        </div>
        <form onSubmit={this._sendMessage} className="new-message-container">
          <input type="text" onChange={this._updateUser} value={this.state.user} className="message-user" placeholder="User" />
          <input type="text" onChange={this._updateMessage} value={this.state.message} className="message-input" placeholder="Message" />
          <button type="submit" className="message-submit">Send</button>
        </form>
      </div>
      )
  }
})

module.exports = ChatRegion