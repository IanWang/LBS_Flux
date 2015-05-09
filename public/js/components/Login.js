var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var auth = require('../stores/auth');
var RedirectWhenLoggedIn = require('../mixins/redirect_when_logged_in');

var Login = React.createClass({

  mixins: [Router.Navigation, RedirectWhenLoggedIn],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function (evt) {
    evt.preventDefault();

    var that = this;
    var form = {
      username: this.refs.name.getDOMNode().value,
      password: this.refs.pass.getDOMNode().value
    };

    auth.login(form, function(err, res) {
      
      if(err) return that.setState({ error: true });
      
      if(Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        that.replaceWith('/dashboard'); 
      }

    });

  },

  render: function () {
    var errors = this.state.error ? <p>Bad login information</p> : '';
    return (

      <form onSubmit={this.handleSubmit}>

        <div className="row">
          <input className="u-full-width" type="text" ref="name" placeholder="username" autoFocus="true" defaultValue="nono"/>
        
          <input className="u-full-width" type="password" ref="pass" placeholder="password"/>
        </div>


        <button type="submit">Log In</button>
        <span className="authLink"><Link to="signup">Sign Up</Link></span>
        
        {errors}
      </form>
    );
  }
});

module.exports = Login;