var NoteActions = {
  keyPressed: function (note) {
    AppDispatcher.dispatch({
      actionType: "PLAY_NOTE",
      note: note
    })
  },
  keyReleased: function (note) {
    AppDispatcher.dispatch({
      actionType: "STOP_NOTE",
      note: note
    })
  },
}
