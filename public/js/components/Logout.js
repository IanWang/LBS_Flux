var React = require('react');
var Router = require('react-router');
var auth = require('../stores/auth');


var Logout = React.createClass({

  mixins: [Router.Navigation],

  componentDidMount: function () {
    auth.logout();
  },

  componentWillMount: function() {
    var that = this;
    setTimeout(function() {
      that.transitionTo('/');  
    }, 2500);
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;