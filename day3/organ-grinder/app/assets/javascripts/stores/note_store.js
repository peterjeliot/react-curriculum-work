
(function(root) {
  var _data = []
  var NoteStore = root.NoteStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _data.slice();
    },
    playNote: function(note) {
      _data.push(note);
      this.emit("change");
    },
    stopNote: function(note) {
      var index = _data.indexOf(note);
      if (index > -1){
        _data.splice(index,1)
        this.emit("change");
      };
    }
  });

  NoteStore.dispatcherID = AppDispatcher.register(function (payload) {
    switch(payload.actionType) {
      case "PLAY_NOTE":
        NoteStore.(payload); //TODO
        break;
      case "STOP_NOTE":
        NoteStore.responseTwo(payload);
        break;
    }
  })

})(this);
