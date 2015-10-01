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
            return <TodoListItem title={todo.title} body={todo.body} id={todo.id}/>
          })
        }
      </div>
    );
  },
});

var TodoListItem = React.createClass({
  handleDestroy: function(id) {
    Todos.destroy(id)
  },
  render: function () {
    return (
      <div className="todo-item">
        <div className="todo-delete"
             onClick={ this.handleDestroy.bind(this,this.props.id) }>x</div>
           <div className="todo-title">{this.props.title}</div>
        <div className="todo-body">{this.props.body}</div>
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
