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
      <ul>
        { this.state.filteredNames.map(function(name, index){
          return <li key={index} onClick={self.handleClick.bind(self, name)}>{name}</li>
        }) }
      </ul>
    </div>;
  }
});

React.render(
  <Autocomplete names={["melanie", "peter", "lahwran", "trevor", "jesus christ", "valentine", "sarah", "dee", "emily"]}/>,
  document.getElementById("autocomplete")
);

var Clock = React.createClass({
  getInitialState: function() {
    return {
      date: new Date()
    };
  },
  render: function () {
    var date = this.state.date;
    return (
      <div className="clock">
        <p>{date.toLocaleTimeString('en-US')}</p>
      </div>
    );
  },
  componentDidMount: function() {
    this.timer = setInterval(this.tick, 500);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  tick: function() {
    this.setState({ date: new Date() });
  }
});

var Weather = React.createClass({
  getInitialState: function() {
    return {
      weather_xml: {weather: [{main: "Zombie Hordes"}], main: {temp: "Desert of Africa"}}
    }
  },
  componentDidMount: function() {
    var self = this;
    var geo = navigator.geolocation;
    geo.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial",
        context: self,
        success: function (data) {
          self.setState({ weather_xml: data });
        },
      })
    });
  },
  render: function () {
    var temperature = this.state.weather_xml.main.temp;
    var weather = this.state.weather_xml.weather[0].main;
    return (
      <div className="weather">
        <div>Weather: {weather}</div>
        <div>Temperature: {temperature}°F</div>
      </div>
    )
  }

});

var WeatherClock = React.createClass({
  render: function() {
    return (
      <div className="weather-clock">
        <Weather/>
        <Clock/>
      </div>
    )
  }
})

React.render(
  <WeatherClock />,
  document.getElementById("weather")
);

var Tabs = React.createClass({
  getInitialState: function() {
    return {
      activeTab: this.props.children[0]
    };
  },
  render: function () {
    var self = this;
    self.props.children.forEach(function (child) {
      child.props.onClick = self.handleClick.bind(self,child);
    })
    return (
      <div>
        {
          self.props.children
        }
        <div className="tab-content">
          { this.state.activeTab.props.children }
        </div>
      </div>
    );
  },
  handleClick: function(tab) {
    this.setState({ activeTab: tab });
  },
});

var Tab = React.createClass({
  render: function () {
    return (
      <div className={"header"} onClick={this.props.onClick}>{this.props.title}</div>
    );
  },
});

React.render(
  <Tabs>
    <Tab title="Main">
      Stuff and things
    </Tab>
    <Tab title="Hotdogs">
      Ketchup, mustard, mystery meat
    </Tab>
    <Tab title="Evil hotdogs">
      Pain, suffering, 100% real beef
    </Tab>
  </Tabs>,
  document.getElementById("tabs")
);
