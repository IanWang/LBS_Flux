var api = 'https://commandp-lbs-backend.herokuapp.com/api/v1/';

var auth = {

	login: function(form, cb) {
		$.ajax({
			method: 'put',
			url: '/login',
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
		$.ajax({
			method: 'post',
			url: '/register',
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