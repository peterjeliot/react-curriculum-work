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
        <TodoForm/>
        {
          this.state.todos.map(function (todo) {
            return <TodoListItem title={todo.title} body={todo.body}/>
          })
        }
      </div>
    );
  },
});

var TodoListItem = React.createClass({
  render: function () {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.body}</div>
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
