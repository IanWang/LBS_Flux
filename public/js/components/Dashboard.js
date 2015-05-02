var React = require('react');
var Authentication = require('../mixins/authentication');
var auth = require('../stores/auth');
var AppActions = require('../actions/AppActions');

var Dashboard = React.createClass({

  mixins: [Authentication],

  getInitialState: function() {
    return {
      token: auth.getToken()
    }
  },

  componentWillMount: function() {
    
  },

  _getNearPlace: function() {
    console.log('1');
    AppActions.createCheckIn(this.state.token);
  },

  render: function () {
    
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>Token: {this.state.token}</p>
        <button onClick={this._getNearPlace}>GetNear</button>
      </div>
    );
  }
});

module.exports = Dashboard;