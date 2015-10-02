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
            return <TodoListItem todo={todo}/>
          })
        }
      </div>
    );
  },
});

var TodoListItem = React.createClass({
  render: function () {
    var todo = this.props.todo;
    return (
      <div className="todo-item">
        <div className="todo-title">{todo.title}</div>
        <TodoDetailView todo={todo}/>
        <DoneButton done={todo.done} id={todo.id}/>
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
