var React = require('react')
var TopicSidebar = require('../components/topic-sidebar.jsx')
var ChatRegion = require('../components/chat-region.jsx')
var Modal = require ('../components/modal.jsx')

var ChatDashboard = React.createClass({
  getInitialState: function() {
    var topics = []
    var topicIndex = 1
    topics.push({
      title: `Topic ${topicIndex}`,
      isActive: true,
      messages: [],
      tid: topicIndex
    })
    return {
      topics: topics,
      topicIndex: topicIndex + 1
    }
  },

  componentWillMount: function() {
    // Todo: Open up a modal that handles meeting management.
    // Modal will show all current meetings that you can join,
    // and will give the option to create your own new meeting.
    // $.get('/meetings')
    //   .done(function(data) {
    //     debugger
    //   })
  },

  componentDidMount: function() {
    socket.on('message', this._handleMessage)
  },

  _indexOfTopic: function(tid) {
    for (var i = 0; i < this.state.topics.length; i++) {
      if (this.state.topics[i].tid == tid)
        return i
    }
    return -1
  },

  _indexOfActiveTopic: function(tid) {
    for (var i = 0; i < this.state.topics.length; i++) {
      if (this.state.topics[i].isActive) return i
    }
    return -1
  },

  _scrollToBottomOfMessages: function() {
    $('.chat-region.active > .messages').scrollTop($('.chat-region.active > .messages')[0].scrollHeight)
  },

  _handleMessage: function(messageObj) {
    index = this._indexOfActiveTopic(messageObj.tid)
    if (index != -1) {
      var newTopics = this.state.topics
      newTopics[index].messages.push({
        text: messageObj.text,
        user: messageObj.user
      })
      this.setState({topics: newTopics})

      // Check to see if user is close to bottom, if not don't scroll
      var activeMessagesRegion = $('.chat-region.active > .messages')
      var heightToBottomOfRegion = activeMessagesRegion[0].scrollHeight - (activeMessagesRegion[0].scrollTop + activeMessagesRegion.height())

      if (heightToBottomOfRegion < 100)
        this._scrollToBottomOfMessages()
    }
  },

  _handleAddTopic: function() {
    var newTopics = this.state.topics
    var currentIndex = this.state.topicIndex
    newTopics.push({
      title: `Topic ${currentIndex}`,
      isActive: Boolean(currentIndex == 1),
      messages: [],
      tid: currentIndex
    })
    this.setState({
      topics: newTopics,
      topicIndex: currentIndex + 1
    })
  },

  _handleSwitchTopic: function(topicID) {
    var newTopics = this.state.topics
    for (var i = 0; i < newTopics.length; i++) {
      if (newTopics[i].tid == topicID) {
        newTopics[i].isActive = true
      } else newTopics[i].isActive = false
    }
    this.setState({topics: newTopics})
    this._scrollToBottomOfMessages()
  },

  _handleRenameTopic: function(topicID, title) {
    var index = this._indexOfTopic(topicID)
    if (index != -1) {
      var newTopics = this.state.topics
      newTopics[index].title = title
      this.setState({topics: newTopics})
    }
  },

  render: function() {
    // If no meeting is set, render meeting modal picker...
    // else load dashboard
    if (this.state.meeting) {
      return (
      <div className="chat-dashboard">
        <TopicSidebar
          topics={this.state.topics}
          handleSwitch={this._handleSwitchTopic}
          handleAdd={this._handleAddTopic}
          handleRename={this._handleRenameTopic}
          />
        <div className="chats-container">
          {this.state.topics.map(function(topic, i) {
            return <ChatRegion key={i} topic={topic} />
          }, this)}
        </div>
      </div>
      )
    } else { // No meeting is loaded, so load meeting modal picker
      return <Modal />
    }
  }
})

module.exports = ChatDashboard