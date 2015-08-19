var React = require('react')

var ChatRegion = React.createClass({
  render: function() {
    return (
      <div className="chat-region">
        <div className="message-container">
          <input type="text" className="message-user" placeholder="User" />
          <textarea type="text" className="message-input" placeholder="Message"></textarea>
          <button className="message-submit">Send</button>
        </div>
      </div>
      )
  }
})

module.exports = ChatRegion