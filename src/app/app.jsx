var React = require('react')
var ChatDashboard = require('./views/chat/chat-dashboard.jsx')

var App = React.createClass({
  render: function() {
    return <ChatDashboard />
  }
})

module.exports = App