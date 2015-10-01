var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      body: ""
    };
  },
  updateTitle: function () {
    this.setState({
      title: event.target.value
    })
  },
  updateBody: function (event) {
    this.setState({
      body: event.target.value
    })
  },
  handleSubmit: function (event) {
    event.preventDefault();
    Todos.create({
      title: this.state.title,
      body: this.state.body,
      done: false
    })
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.title} onChange={this.updateTitle} />
          <input type="text" value={this.state.body} onChange={this.updateBody} />
          <input type="submit" value="Create!" />
        </form>
      </div>
    );
  },
});
