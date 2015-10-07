var NoteActions = {
  keyPressed: function (noteName) {
    AppDispatcher.dispatch({
      actionType: "PLAY_NOTE",
      noteName: noteName
    })
  },
  keyReleased: function (noteName) {
    AppDispatcher.dispatch({
      actionType: "STOP_NOTE",
      noteName: noteName
    })
  },
}
