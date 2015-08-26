var React = require('react')

var Topic = React.createClass({
  _handleSwitch: function() {
    this.props.handleSwitch(this.props.conversation)
  },

  render: function() {
    return (
      <div onClick={this._handleSwitch} className="topic">
        {this.props.conversation.topic}
      </div>
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
    var topics = this.props.conversations.map(function(conversation, i) {
      return (
        <Topic handleSwitch={this.props.handleSwitch} key={i} conversation={conversation} />
        )
    }, this)

    return (
      <div className="topic-sidebar">
        <div className="navbar">
          <div className="nav-brand">Rapport</div>
          <i onClick={this.props.handleAdd} className="fa fa-plus-circle add-topic"></i>
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