var Recorder = React.createClass({
  getInitialState: function() {
    return {
      isRecording: false,
      track: new Track({name: "foo"})
    };
  },
  componentDidMount: function () {
    KeyStore.on("change", this.handleChange);
  },
  componentWillUnmount: function() {
    KeyStore.removeListener("change", this.handleChange);
  },
  handleChange: function () {
    if (this.state.isRecording) {
      this.state.track.addNotes(KeyStore.all());
    }
  },
  handleStart: function() {
    this.state.track.startRecording();
    this.setState({isRecording: true});
  },
  handleStop: function() {
    this.state.track.stopRecording();
    this.setState({isRecording: false});
  },
  handlePlay: function() {
    this.state.track.play();
    this.setState({isRecording: false});
  },
  render: function () {
    return (
      <div className="recorder">
        <div>Recorder</div>
        <button className="recorder-start-button" onClick={this.handleStart}>
          Start
        </button>
        <button className="recorder-stop-button" onClick={this.handleStop}>
          Stop
        </button>
        <button className="recorder-play-button" onClick={this.handlePlay}>
          Play
        </button>
      </div>
    );
  },
});
