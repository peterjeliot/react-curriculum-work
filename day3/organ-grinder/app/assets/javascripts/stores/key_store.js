
(function(root) {
  var _data = {};
  var KeyStore = root.KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return $.extend({}, _data);
    },
    playNote: function(noteName) {
      _data[noteName] = true;
      this.emit("change");
    },
    stopNote: function(noteName) {
      _data[noteName] = false;
      this.emit("change");
    }
  });

  KeyStore.dispatcherID = AppDispatcher.register(function (noteAction) {
    switch(noteAction.actionType) {
      case "PLAY_NOTE":
        KeyStore.playNote(noteAction.noteName);
        break;
      case "STOP_NOTE":
        KeyStore.stopNote(noteAction.noteName);
        break;
    }
  })

})(this);
