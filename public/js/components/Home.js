var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	render: function() {
		return (
			<div>
				<p>Now you can
          <Link to="signup"> Signup </Link>
          or 
          <Link to="login"> Login </Link>
        </p>
      </div>
     );
	}
});

module.exports = Home;