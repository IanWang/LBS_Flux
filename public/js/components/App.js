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
  console.log('!!RESET STATE!!');
  if(auth.loggedIn()) {
    return {
      myLocation: AppStore.getLocation(),
      myPlace: AppStore.getPlace(),
      nearPlaces: AppStore.getNearPlace(),
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

    return (
      <div className="">
        <RouteHandler
          myLocation={this.state.myLocation}
          myPlace={this.state.myPlace}
          nearPlaces={this.state.nearPlaces}/>
      </div>
    );
  }

});

module.exports = App;
