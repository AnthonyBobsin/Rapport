var React = require('react')

var Topic = React.createClass({
  _handleSwitch: function(e) {
    e.stopPropagation()
    this.props.handleSwitch(this.props.conversation.cid)
  },

  _handleRename: function(e) {
    e.stopPropagation()
    // Hide text div and show input text
    // On enter call handleRename with cid and input value
    this.props.handleRename(this.props.conversation.cid, "Test")
  },

  render: function() {
    var containerDivClassString = "topic-container " + (this.props.conversation.isActive ? "active" : "")
    var statusClassString = "topic-status " + (this.props.conversation.isActive ? "active" : "")
    var editTopicClassString = "fa fa-pencil " + (this.props.conversation.isActive ? "" : "hide")

    return (
      <div className={containerDivClassString}>
        <div className={statusClassString}></div>
        <div onClick={this._handleSwitch} className="topic">
          {this.props.conversation.topic}
        </div>
        <i onClick={this._handleRename} className={editTopicClassString}></i>
      </div>
      )
  }
})

var Sidebar = React.createClass({
  render: function() {
    var topics = this.props.conversations.map(function(conversation, i) {
      return (
        <Topic handleSwitch={this.props.handleSwitch}
          handleRename={this.props.handleRename}
          key={i} conversation={conversation}
        />
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