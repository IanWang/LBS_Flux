var api = 'https://commandp-lbs-backend.herokuapp.com/api/v1/';

var auth = {

	login: function(form, cb) {
		$.put({
			url: api + 'login',
			data: form,
			success: function(data) {
				cb(null, data);
			},
			error: function(xhr, status, err) {
				cb(err.toString(), null);
			}
		});
	},
	signup: function(form, cb) {
		$.post({
			url: api + 'register',
			data: form,
			success: function(data) {
				cb(null, data);
			},
			error: function(xhr, status, err) {
				cb(err.toString(), null);
			}
		});
	},

	_loggedIn: function() {

	}

};

module.exports = auth;