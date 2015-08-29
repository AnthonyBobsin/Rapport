var React = require('react')
var TopicSidebar = require('../components/topic-sidebar.jsx')
var ChatRegion = require('../components/chat-region.jsx')

var ChatDashboard = React.createClass({
  getInitialState: function() {
    var conversations = []
    var conversationIndex = 1
    conversations.push({
      topic: `Topic ${conversationIndex}`,
      isActive: true,
      messages: [],
      cid: conversationIndex
    })
    return {
      conversations: conversations,
      conversationIndex: conversationIndex + 1
    }
  },

  componentDidMount: function() {
    socket.on('message', this.handleMessage)
  },

  indexOfConversation: function(cid) {
    for (var i = 0; i < this.state.conversations.length; i++) {
      if (this.state.conversations[i].cid == cid)
        return i
    }
    return -1
  },

  indexOfActiveConversation: function(cid) {
    for (var i = 0; i < this.state.conversations.length; i++) {
      if (this.state.conversations[i].isActive) return i
    }
    return -1
  },

  handleMessage: function(messageObj) {
    index = this.indexOfActiveConversation(messageObj.cid)
    if (index != -1) {
      var newConversations = this.state.conversations
      newConversations[index].messages.push({
        text: messageObj.text,
        user: messageObj.user
      })
      this.setState({conversations: newConversations})
      // TODO: Add a check to see if user has not scrolled up
      var activeMessagesRegion = $('.chat-region.active > .messages')
      activeMessagesRegion.animate({scrollTop: activeMessagesRegion[0].scrollHeight}, 'fast')
    }
  },

  handleAddTopic: function() {
    var newConversations = this.state.conversations
    var currentIndex = this.state.conversationIndex
    newConversations.push({
      topic: `Topic ${currentIndex}`,
      isActive: Boolean(currentIndex == 1),
      messages: [],
      cid: currentIndex
    })
    this.setState({
      conversations: newConversations,
      conversationIndex: currentIndex + 1
    })
  },

  handleSwitchTopic: function(conversationID) {
    var newConversations = this.state.conversations
    for (var i = 0; i < newConversations.length; i++) {
      if (newConversations[i].cid == conversationID) {
        newConversations[i].isActive = true
      } else newConversations[i].isActive = false
    }
    this.setState({conversations: newConversations})
  },

  handleRenameTopic: function(conversationID, title) {
    var index = this.indexOfConversation(conversationID)
    if (index != -1) {
      var newConversations = this.state.conversations
      newConversations[index].topic = title
      this.setState({conversations: newConversations})
    }
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
          handleSwitch={this.handleSwitchTopic}
          handleAdd={this.handleAddTopic}
          handleRename={this.handleRenameTopic}
        />
        <div className="chats-container">{chatRegions}</div>
      </div>
      )
  }
})

module.exports = ChatDashboard