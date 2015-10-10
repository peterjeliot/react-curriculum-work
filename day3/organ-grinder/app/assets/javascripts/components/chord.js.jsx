var Chord = React.createClass({
  getInitialState: function() {
    return {
      playing: false
    };
  },
  componentDidMount: function() {
    KeyStore.on("change", this.handleChange);
  },
  componentWillUnmount: function() {
    KeyStore.removeListener("change", this.handleChange);
    this.props.noteNames.forEach(function(noteName) {
      NoteActions.keyReleased(noteName);
    });
  },
  render: function () {
    return (
      <div className={this.state.playing ? "organ-chord playing" : "organ-chord"}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}>
        <div className="chord-name">
          {this.props.chordName}
        </div>
      </div>
    );
  },
  handleMouseDown: function (event) {
    event.preventDefault();
    this.props.noteNames.forEach(function (noteName) {
      NoteActions.keyPressed(noteName);
    });
  },
  handleMouseUp: function (event) {
    event.preventDefault();
    this.props.noteNames.forEach(function (noteName) {
      NoteActions.keyReleased(noteName);
    });
  },
  handleChange: function () {
    if (this.props.noteNames.every(function (noteName) {
      return KeyStore.contains(noteName)
    })) {
      this.setState({ playing: true });
    } else {
      this.setState({ playing: false });
    }
  },
});
