var Organ = React.createClass({
  render: function() {
    var self = this;
    return (
      <div>
        {
          Object.keys(TONES).map(function (key) {
            return <Key key={key} keyboardKey={self.props.keyBinds[key]} noteName={key}/>
          })
        }
        <div>
          {
            Object.keys(CHORDS).map(function (chordName) {
              var notes = CHORDS[chordName];
              return <Chord chordName={chordName} noteNames={notes}/>
            })
          }
        </div>
        <Recorder />
      </div>
    )
  }

});

$(function () {
  React.render(
    <Organ keyBinds={ KEYBINDS }/>,
    document.getElementById("content")
  )
})
