var Key = React.createClass({
  getInitialState: function() {
    return {
      playing: false
    };
  },
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
    var className = "organ-key";
    if(this.state.playing) {
      className += " playing"
    }
    if(this.props.noteName.indexOf("#") > -1){ //TODO: This is fragile
      className += " organ-key-black"
    }
    return (
      <div className={className}
           onMouseDown={this.handleMouseDown}
           onMouseUp={this.handleMouseUp}
           onMouseLeave={this.handleMouseUp}>
        <div className="note-name">{ this.props.noteName }</div>
      </div>
    );
  },
  handleMouseDown: function(event) {
    if ((event.type === "mousedown") || (String.fromCharCode(event.keyCode) === this.props.keyboardKey)){
      event.preventDefault();
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
      this.setState({playing: true})
      this.note.start()
    } else {
      this.setState({playing: false})
      this.note.stop()
    }
  }
});
