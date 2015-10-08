var Key = React.createClass({
  componentDidMount: function() {
    this.note = new Note(TONES[this.props.noteName]);
    KeyStore.on("change", this.handleChange);
    $(document).keydown(this.handleMouseDown);
    $(document).keyup(this.handleMouseUp);
  },
  componentWillUnmount: function() {
    KeyStore.removeListener("change", this.handleChange);
    NoteActions.keyReleased(this.props.noteName);
    this.note.stop();
  },
  render: function () {
    return (
      <div onMouseDown={this.handleMouseDown}
           onMouseUp={this.handleMouseUp}
           onMouseLeave={this.handleMouseUp}>
        { this.props.noteName }</div>
    );
  },
  handleMouseDown: function(event) {
    if ((event.type === "mousedown") || (String.fromCharCode(event.keyCode) === this.props.keyboardKey)){
      NoteActions.keyPressed(this.props.noteName);
    }
  },
  handleMouseUp: function(event) {
    if (((event.type === "mouseup") || (event.type === "mouseleave")) ||
    String.fromCharCode(event.keyCode) === this.props.keyboardKey){
      NoteActions.keyReleased(this.props.noteName);
    }
  },
  handleChange: function () {
    if (KeyStore.all()[this.props.noteName]) {
      this.note.start()
    } else {
      this.note.stop()
    }
  }
});

$(function () {
  React.render(
    <div>
      {
        Object.keys(TONES).map(function (key) {
          return <Key key={key} keyboardKey={KEYBINDS[key]} noteName={key}/>
        })
      }
    </div>,
    document.getElementById("content")
  )
})
