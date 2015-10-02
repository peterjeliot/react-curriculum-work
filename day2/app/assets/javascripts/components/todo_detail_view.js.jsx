var TodoDetailView = React.createClass({
  getInitialState: function() {
    return {visible: false}
  },
  handleDestroy: function() {
    Todos.destroy(this.props.todo.id);
  },
  handleClick: function() {
    this.setState({visible: !this.state.visible});
  },
  render: function () {
    if (this.state.visible){
      return (
        <div>
          <div className="todo-delete"
                 onClick={ this.handleDestroy }>
            x
          </div>
          <div className="todo-body">{this.props.todo.body}</div>
          <div onClick={this.handleClick}>[-]</div>
        </div>
      );
    } else {
      return (
        <div onClick={this.handleClick}>[+]</div>
      )
    }
  },
});
