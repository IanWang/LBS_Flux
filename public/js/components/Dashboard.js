var React = require('react');
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
      myLocation: {
        lat: '',
        lng: ''
      }
    };
  },

  componentWillMount: function() {
    this._getLocation();
  },

  componentWillReceiveProps: function(props) {
    console.log('new props ', props);
    this.setState({
      myLocation: {
        lat: props.myLocation.lat,
        lng: props.myLocation.lng
      }
    })
  },

  _getLocation: function() {
    console.log('1');
    AppActions.getLocation(this.state.token);
  },

  _createPlace: function() {
    var name = window.prompt('Name this place: ');
    var place = assign(this.state.myLocation, {name: name});
    AppActions.createPlace(place);
  },

  render: function () {
    
    return (
      <div className="pure-u-1 dashboard">
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>Token: {this.state.token}</p>
        <button onClick={this._createPlace}>Add current Place</button>
        <Map 
          lat={this.state.myLocation.lat}
          lng={this.state.myLocation.lng}
        />
      </div>
    );
  }
});

module.exports = Dashboard;