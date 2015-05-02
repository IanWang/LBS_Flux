var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var auth = require('../services/auth');

var App = React.createClass({

	getInitialState: function() {
    return {
    	loggedIn: false
    };
  },

  render: function() {

  	var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Logout</Link> :
      <Link to="login">Login</Link>;

  	return (
      <div>
      	
      	<header>
          <ul>
            <li>{loginOrOut}</li>
          </ul>
        </header>

      	<RouteHandler/>
      </div>
     );
  }

});

module.exports = App;
