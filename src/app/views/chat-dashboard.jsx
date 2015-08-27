var React = require('react')
var TopicSidebar = require('../components/topic-sidebar.jsx')
var ChatRegion = require('../components/chat-region.jsx')

var ChatDashboard = React.createClass({
  getInitialState: function() {
    var conversations = []
    var conversationIndex = 0
    conversations.push({
      topic: "First Topic",
      isActive: true,
      messages: [],
      cid: conversationIndex
    })
    return {
      conversations: conversations,
      conversationIndex: 0
    }
  },

  componentDidMount: function() {
    socket.on('message', this._handleMessage)
  },

  _handleMessage: function(messageObj) {
    for (var i = 0; i < this.state.conversations.length; i++) {
      if (this.state.conversations[i].cid == messageObj.cid) {
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
    var newConversationIndex = this.state.conversationIndex + 1
    newConversations.push({
      topic: "Another Topic",
      isActive: false,
      messages: [],
      cid: newConversationIndex
    })
    this.setState({
      conversations: newConversations,
      conversationIndex: newConversationIndex
    })
  },

  _handleSwitchTopic: function(conversationID) {
    var newConversations = this.state.conversations
    for (var i = 0; i < newConversations.length; i++) {
      if (newConversations[i].cid == conversationID) {
        newConversations[i].isActive = true
      } else newConversations[i].isActive = false
    }
    this.setState({conversations: newConversations})
  },

  _handleRenameTopic: function(conversationID, title) {
    var newConversations = this.state.conversations
    for (var i = 0; i < newConversations.length; i++) {
      if (newConversations[i].cid == conversationID)
        newConversations[i].topic = title
    }
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
          handleSwitch={this._handleSwitchTopic}
          handleAdd={this._handleAddTopic}
          handleRename={this._handleRenameTopic}
        />
        {chatRegions}
      </div>
      )
  }
})

module.exports = ChatDashboard