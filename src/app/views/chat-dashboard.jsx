var React = require('react')
var TopicSidebar = require('../components/topic-sidebar.jsx')
var ChatRegion = require('../components/chat-region.jsx')

var ChatDashboard = React.createClass({
  render: function() {
    return (
      <div className="chat-dashboard">
        <TopicSidebar />
        <ChatRegion />
      </div>
      )
  }
})

module.exports = ChatDashboard