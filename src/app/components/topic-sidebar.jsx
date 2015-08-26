var React = require('react')

var Topic = React.createClass({
  render: function() {
    return (
      <div className="topic">{this.props.topic}</div>
      )
  }
})

var Sidebar = React.createClass({
  getInitialState: function() {


    return {
      topics: []
    }
  },

  render: function() {
    var topics = this.props.topics.map(function(topic, i) {
      return (
        <Topic key={i} topic={topic} />
        )
    })

    return (
      <div className="topic-sidebar">
        <div className="navbar">
          <div className="nav-brand">Rapport</div>
          <i className="fa fa-plus-circle"></i>
        </div>
        <div className="topics-container">
          {/* <div className="topics-header">Topics</div> */}
          {topics}
        </div>
      </div>
      )
  }
})

module.exports = Sidebar