// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

(function (window) {
  var _todos = [];
  var _callbacks = [];

  Todos = {
    all: function() {
      return _todos;
    },
    toggleDone: function (id) {
      var self = this;
      var index = this.find(id);
      if (index < 0) {
        console.log("Toggling a non-existant TODO");
        return false;
      }
      var todo = _todos[index];
      var old_done = todo.done;
      todo.done = !todo.done;
      $.ajax({
        url: "/api/todos/" + todo.id,
        method: "POST",
        data: {_method: "PATCH", todo: todo},
        dataType: 'text json',
        success: function (data) {
          self.changed();
        },
        error: function (data) {
          todo.done = old_done;
        }
      })
    },
    create: function(todo) {
      var self = this;
      $.ajax({
        url: "/api/todos/",
        method: "POST",
        data: {todo: todo},
        dataType: 'text json',
        success: function (data) {
          _todos.push(data);
          self.changed();
        }
      })

    },
    fetch: function() {
      var self = this;
      $.ajax({
        url: "/api/todos/",
        dataType: 'text json',
        success: function (data) {
          _todos = data;
          self.changed();
        },
      })
    },
    destroy: function(id) {
      var self = this;
      $.ajax({
        url: "/api/todos/" + id,
        method: "POST",
        data: {_method: "DELETE"},
        dataType: 'text json',
        success: function (data) {
          var index = self.find(id)
          _todos.splice(index,1);
          self.changed();
        }
      });
    },
    find: function(id) {
      for (i = 0; i < _todos.length; i++) {
        if (_todos[i].id == id) {
          return i;
        }
      }
      return -1;
    },
    changed: function() {
      _callbacks.forEach(function(callback) {callback();});
    },
    addChangedHandler: function(handler) {
      _callbacks.append(handler)
    },
    removeChangedHandler: function(handler) {
      var index = _callbacks.indexOf(handler)
      if (index > -1) {
        _callbacks.splice(index,1)
      }
    }
  };
})(this);
