var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
/*
var RedirectIfLoggedin = require('../mixins/RedirectIfLoggedin');
*/
var Signup = React.createClass({

	getInitialState: function () {
    return {
      error: false
    };
  },

	handleSubmit: function(evt) {
		evt.preventDefault();
		var form = {
			user: {
				username: this.refs.name.getDOMNode().value,
				email: this.refs.email.getDOMNode().value,
				password: this.refs.pass.getDOMNode().value
			}
		};
		console.log(form);
	},

	render: function () {
    
    var error = this.state.error ? <p>Bad login information</p> : '';

    return (
      <form onSubmit={this.handleSubmit}>
      	<label>
          <input ref="name" placeholder="username" defaultValue="locus"/>
        </label>
        <label>
          <input ref="pass" placeholder="password"/>
        </label>
        <label>
          <input ref="email" placeholder="email" defaultValue="Locus@example.com"/>
        </label>
        <br/>
        <button type="submit">Signup</button>
        {error}
      </form>
    );
  }
});

module.exports = Signup;