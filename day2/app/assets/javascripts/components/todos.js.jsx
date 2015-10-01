var TodoList = React.createClass({
  getInitialState: function() {
    return {
      todos: Todos.all()
    };
  },
  render: function () {
    return (
      <div>
        {
          this.state.todos.map(function (todo) {
            <li>{todo.title}</li>
          })
        }
      </div>
    );
  },
});

React.render(
  <TodoList/>,
  document.body
)
