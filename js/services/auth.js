var request = require('request');
var api = 'https://commandp-lbs-backend.herokuapp.com/api/v1/';

var auth = {

	login: function(form) {
		request.put({
			url: api + 'login',
			formData: form
		}, function(err, res, body) {
			if (err) {
    		return console.error('Login failed:', err);
  		}
  		console.log('Login!  Server responded with:', body);
		});
	},
	signup: function(form) {
		request.post({
			url: api + 'register',
			formData: form
		}, function(err, res, body) {
			if (err) {
    		return console.error('Signup failed:', err);
  		}
  		console.log('Signup!  Server responded with:', body);
		});
	},

	_loggedIn: function() {

	}

};
