var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var auth = require('../stores/auth');
var AppStore = require('../stores/AppStore');

/**
 * Retrieve the current  data from the TodoStore
 */
function getAppState() {
  console.log('reset state...');
  if(auth.loggedIn()) {
    console.log('is Auth!');
    return {
      allPlaces: AppStore.getAll(),
      myLocation: AppStore.getLocation(),
      loggedIn: auth.loggedIn()
    };
  }

  return { loggedIn: false }

}

var App = React.createClass({

  getInitialState: function () {
    return { 
      loggedIn: false  
    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    auth.onChange = this.setStateOnAuth;
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAppState());
  },


  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Log in</Link>;

    return (
      <div className="pure-g">
        <ul className="nav pure-u-1">
          <li>{loginOrOut}</li>
          <li><Link to="signup">Sign up</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
        </ul>
        <RouteHandler
          myLocation={this.state.myLocation}
        />
      </div>
    );
  }

});

module.exports = App;
