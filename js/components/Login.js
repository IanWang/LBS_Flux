var React = require('react');

var Login = React.createClass({
	render: function() {
		return (
			<div>
				<form>
      	<label>
          <input ref="name" placeholder="username" defaultValue="Ian"/>
        </label>
        <label>
          <input ref="pass" placeholder="password"/>
        </label>
        </form>
      </div>
     );
	}
});

module.exports = Login;