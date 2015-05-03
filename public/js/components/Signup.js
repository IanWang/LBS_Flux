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

  handleSubmit: function(evt) {
    
    evt.preventDefault();
    
    var that = this;
    var form = {
      user: {
        username: this.refs.name.getDOMNode().value,
        email: this.refs.email.getDOMNode().value,
        password: this.refs.pass.getDOMNode().value
      }
    };

    auth.signup(form, function(err, res) {
      
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
      <form className="pure-form pure-u-1-2" onSubmit={this.handleSubmit}>
        <fieldset className="pure-group">          
          <input className="pure-u-1" ref="name" placeholder="username" autoFocus="true" defaultValue="nono"/>
      
          <input className="pure-u-1" ref="pass" placeholder="password"/>
      
          <input className="pure-u-1" ref="email" placeholder="email" defaultValue="@example.com"/>
        </fieldset>

        {errors}

        <button type="submit" className="pure-button button-secondary pure-u-1">Sign Up</button>
        
      </form>
    );
  }
});

module.exports = Login;