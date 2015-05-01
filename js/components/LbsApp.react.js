var React = require('react');

var LbsApp  =React.createClass({
	getInitialState: function() {
    return {
    	name: 'Zoro',
    	age: 12
    };
  },

  render: function() {
  	return (
      <div>
      	{this.state.name}, {this.state.age}
      </div>
     );
  }

});

module.exports = LbsApp;
