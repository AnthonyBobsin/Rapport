var React = require('react')
var ChatDashboard = require('./views/chat-dashboard.jsx')
var Navbar = require('./components/navbar.jsx')

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <ChatDashboard />
      </div>
    )
  }
})

module.exports = App