var React = require('react')

var Topic = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false
    }
  },

  componentDidUpdate: function() {
    if (this.state.isEditing) $('input.topic').focus()
  },

  _handleSwitch: function(e) {
    e.stopPropagation()
    this.props.handleSwitch(this.props.conversation.cid)
  },

  _triggerRename: function(e) {
    e.stopPropagation()
    this.setState({isEditing: false})
    this.props.handleRename(this.props.conversation.cid, e.target.value)
  },

  _startEditing: function(e) {
    this.setState({isEditing: true})
  },

  _checkForEnter: function(e) {
    e.stopPropagation()
    var keyCode = e.keyCode || e.which
    if (keyCode == 13) this._triggerRename(e)
  },

  render: function() {
    var containerDivClass = "topic-container " + (this.props.conversation.isActive ? "active" : "")
    var statusClass = "topic-status " + (this.props.conversation.isActive ? "active" : "")
    var topicTextClass = "topic " + (this.state.isEditing ? "hide" : "")
    var topicInputClass = "topic " + (this.state.isEditing ? "" : "hide")
    var editTopicClass = "fa fa-pencil " + (this.props.conversation.isActive ? "" : "hide")

    return (
      <div className={containerDivClass}>
        <div className={statusClass} />
        <div onClick={this._handleSwitch} className={topicTextClass}>
          {this.props.conversation.topic}
        </div>
        <input
          type="text"
          onBlur={this._triggerRename}
          onKeyPress={this._checkForEnter}
          defaultValue={this.props.conversation.topic}
          className={topicInputClass}
          />
        <i onClick={this._startEditing} className={editTopicClass} />
      </div>
      )
  }
})

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="topic-sidebar">
        <div className="navbar">
          <div className="nav-brand">Rapport</div>
          <i onClick={this.props.handleAdd} className="fa fa-plus-circle add-topic" />
        </div>
        <div className="topics-container">
          {this.props.conversations.map(function(conversation, i) {
            return <Topic
              handleSwitch={this.props.handleSwitch}
              handleRename={this.props.handleRename}
              key={i} conversation={conversation}
              />
          }, this)}
        </div>
      </div>
      )
  }
})

module.exports = Sidebar