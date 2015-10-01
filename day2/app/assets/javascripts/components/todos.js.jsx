var TodoList = React.createClass({
  getInitialState: function() {
    return {
      todos: Todos.all()
    };
  },
  todosChanged: function () {
    this.setState({ todos: Todos.all() });
  },
  componentDidMount: function () {
    Todos.addChangedHandler(this.todosChanged);
    Todos.fetch();
  },
  render: function () {
    return (
      <div>
        <h2>Todos</h2>
        {
          this.state.todos.map(function (todo) {
            return <li>{todo.title}</li>
          })
        }
      </div>
    );
  },
});

$(function(){
  React.render(
  <TodoList/>,
  document.getElementById('todo-list')
)
})
