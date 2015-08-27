var React = require('react')

var Topic = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
      topic: this.props.conversation.topic
    }
  },

  componentDidUpdate: function() {
    if (this.state.isEditing) $('input.topic').focus()
  },

  _handleSwitch: function(e) {
    e.stopPropagation()
    this.props.handleSwitch(this.props.conversation.cid)
  },

  triggerRename: function() {
    this.props.handleRename(this.props.conversation.cid, this.state.topic)
  },

  startEditing: function(e) {
    this.setState({isEditing: true})
  },

  stopEditing: function(e) {
    this.setState({isEditing: false})
    this.triggerRename()
  },

  checkForEnter: function(e) {
    var keyCode = e.keyCode || e.which
    if (keyCode == 13) this.stopEditing()
  },

  updateTopic: function(e) {
    this.setState({topic: e.target.value})
  },

  render: function() {
    var containerDivClassString = "topic-container " + (this.props.conversation.isActive ? "active" : "")
    var statusClassString = "topic-status " + (this.props.conversation.isActive ? "active" : "")
    var topicTextClassString = "topic " + (this.state.isEditing ? "hide" : "")
    var topicInputClassString = "topic " + (this.state.isEditing ? "" : "hide")
    var editTopicClassString = "fa fa-pencil " + (this.props.conversation.isActive ? "" : "hide")

    return (
      <div className={containerDivClassString}>
        <div className={statusClassString}></div>
        <div onClick={this._handleSwitch} className={topicTextClassString}>
          {this.state.topic}
        </div>
        <input type="text" onChange={this.updateTopic} onBlur={this.stopEditing} onKeyPress={this.checkForEnter}
          value={this.state.topic} className={topicInputClassString} />
        <i onClick={this.startEditing} className={editTopicClassString}></i>
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
          key={i} conversation={conversation} />
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