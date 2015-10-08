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
