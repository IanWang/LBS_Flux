var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var auth = require('../stores/auth');
var AppStore = require('../stores/checkin');


/**
 * Retrieve the current  data from the TodoStore
 */
function getAppState() {
  return {
    allPlaces: AppStore.getAll()
  };
}

var App = React.createClass({

  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn()
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
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="signup">Sign up</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = App;
