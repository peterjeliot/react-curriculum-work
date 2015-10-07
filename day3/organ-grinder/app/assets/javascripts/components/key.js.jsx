var Key = React.createClass({
  componentDidMount: function() {
    this.note = new Note(TONES[this.props.noteName]);
    KeyStore.on("change", this.handleChange);
    $(document).keydown("a",this.handleMouseDown);
    $(document).keyup("a",this.handleMouseUp);
  },
  componentWillUnmount: function() {
    KeyStore.removeListener("change", this.handleChange);
    NoteActions.keyReleased(this.props.noteName);
    this.note.stop();
  },
  render: function () {
    return (
      <div onMouseDown={ this.handleMouseDown }
        onMouseUp={ this.handleMouseUp }>{ this.props.noteName }</div>
    );
  },
  handleMouseDown: function() {
    NoteActions.keyPressed(this.props.noteName);
  },
  handleMouseUp: function() {
    NoteActions.keyReleased(this.props.noteName);
  },
  handleChange: function () {
    if (KeyStore.all().indexOf(this.props.noteName) > -1) {
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
          return <Key key={key} noteName={key}/>
        })
      }
    </div>,
    document.getElementById("content")
  )
})
