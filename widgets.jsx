var Autocomplete = React.createClass({
  getInitialState: function() {
    return {
      userInput: "",
      filteredNames: this.props.names
    };
  },
  handleChange: function (event) {
    this.setState({
      userInput: event.target.value,
      filteredNames: this.props.names.filter(function (name) {
        return name.indexOf(event.target.value) > -1;
      })
    });
  },
  handleClick: function (name) {
    this.setState({ userInput: name });
  },
  render: function(){
    var self = this;
    return <div>
      <input type="text" value={this.state.userInput} onChange={this.handleChange}></input>
      <div>You typed: {this.state.userInput}!</div>
        <ul>
          { this.state.filteredNames.map(function(name, index){
            return <li onClick={self.handleClick.bind(self, name)}>{name}</li>
          }) }
        </ul>
    </div>;

  }
});


React.render(
  <Autocomplete names={["melanie", "peter", "lahwran", "trevor", "jesus christ", "valentine", "sarah", "dee", "emily"]}/>,
  document.getElementById("content")
);
