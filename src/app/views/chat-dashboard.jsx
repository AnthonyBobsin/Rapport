var React = require('react')
var TopicSidebar = require('../components/topic-sidebar.jsx')
var ChatRegion = require('../components/chat-region.jsx')

var ChatDashboard = React.createClass({
  getInitialState: function() {
    var conversations = []
    conversations.push({
      topic: "First Topic",
      isActive: true,
      messages: []
    })
    return {
      conversations: conversations
    }
  },

  componentDidMount: function() {
    socket.on('message', this._handleMessage)
  },

  _handleMessage: function(messageObj) {
    for (var i = 0; i < this.state.conversations.length; i++) {
      if (this.state.conversations[i].topic == messageObj.topic) {
        var newConversations = this.state.conversations
        newConversations[i].messages.push({
          text: messageObj.text,
          user: messageObj.user
        })
        this.setState({conversations: newConversations})
      }
    }
  },

  _handleAddTopic: function() {
    var newConversations = this.state.conversations
    newConversations.push({
      topic: "Another Topic",
      isActive: false,
      messages: []
    })
    this.setState({conversations: newConversations})
  },

  _handleSwitchTopic: function(conversation) {
    var newConversations = this.state.conversations
    newConversations.map(function(c) {
      if (c == conversation) {
        c.isActive = true
      } else c.isActive = false
    }, this)
    this.setState({conversations: newConversations})
  },

  render: function() {
    var chatRegions = this.state.conversations.map(function(conversation, i) {
      return (
        <ChatRegion key={i} conversation={conversation} />
      )
    })

    return (
      <div className="chat-dashboard">
        <TopicSidebar conversations={this.state.conversations}
          handleSwitch={this._handleSwitchTopic} handleAdd={this._handleAddTopic}
        />
        {chatRegions}
      </div>
      )
  }
})

module.exports = ChatDashboard