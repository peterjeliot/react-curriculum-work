var DoneButton = React.createClass({
  handleClick: function () {
    Todos.toggleDone(this.props.id);
  },
  render: function () {
    return (
      <div onClick={this.handleClick}>
        {
          this.props.done ? "Undo" : "Done"
        }
      </div>
    )
  },
});
