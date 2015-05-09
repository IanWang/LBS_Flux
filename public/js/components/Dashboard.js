var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Authentication = require('../mixins/authentication');
var auth = require('../stores/auth');
var AppActions = require('../actions/AppActions');
var assign = require('object-assign');

var Map = require('./map');


var Dashboard = React.createClass({

  mixins: [Authentication],

  getInitialState: function() {
    return {
      token: auth.getToken(),
      nearPlaces: {},
      myPlace: {
        name: '',
        id: ''
      },
      myLocation: {}
    };
  },

  componentWillMount: function() {
    this._getLocation();
  },

  componentWillReceiveProps: function(props) {
    console.log('new props ', props);
    this.setState({
      myLocation: props.myLocation,
      myPlace: props.myPlace,
      nearPlaces: props.nearPlaces
    })
  },

  _getLocation: function() {
    AppActions.getLocation(this.state.token);
  },

  _createPlace: function() {
    var name = window.prompt('Name this place: ');
    var place = assign(this.state.myLocation, {name: name});
    AppActions.createPlace(place);
  },

  _createCheckIn: function() {
    /*
    this._createPlace();
    AppActions.createCheckIn();
    */
  },

  render: function () {
  
    return (
      <div className="container dashboard">
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>Token: {this.state.token}</p>

        <button onClick={this._createPlace}>Creat Place</button>
        <button onClick={this._createCheckIn}>Check In</button>
        
        <p>Current Place: {this.state.myPlace.name}</p>
        <p>Current PlaceId: {this.state.myPlace.id}</p>

        <Map 
          myLocation={this.state.myLocation}
          places={this.state.nearPlaces} />

        <p className="authLink"><Link to="logout">Log out</Link></p>

      </div>
    );
  }
});

module.exports = Dashboard;