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
    AppActions.getLocation();
  },

  _createPlace: function(position, cb) {
    position = position || this.state.myLocation;
    var name = window.prompt('Name this place before create: ');
    var place = assign(position, {name: name});

    if(!name) {
      cb(false);
    } else {
      AppActions.createPlace(place);
      cb(true);
    }
  },

  _createCheckIn: function(placeId) {
    
    var comment = window.prompt('What do you think about this place?');

    if(!comment) return;
    AppActions.createCheckIn(placeId, comment);
    
  },

  render: function () {
  
    return (
      <div className="container dashboard">
        <h1>Dashboard</h1>
        <p>Please open the console to view the process!</p>

        <button onClick={this._createPlace}>Name Current Place</button>

        <ul>
          <li>Click on Map to create new Places</li>
          <li>Click on Marker to Check In</li>
        </ul>
        
        <Map 
          myLocation={this.state.myLocation}
          myPlace={this.state.myPlace}
          places={this.state.nearPlaces}
          createPlace={this._createPlace}
          createCheckIn={this._createCheckIn} />

        <p className="authLink"><Link to="logout">Log out</Link></p>

      </div>
    );
  }
});

module.exports = Dashboard;