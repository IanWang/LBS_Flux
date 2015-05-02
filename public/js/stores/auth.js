var api = 'https://commandp-lbs-backend.herokuapp.com/api/v1/';

var auth = {

  login: function(form, cb) {

    $.ajax({
      method: 'put',
      url: '/login',
      data: form,
      success: function(data) {
        
        console.log('res data! ', data);
        
        if(data.authenticated && data.token) {
          localStorage.setItem('token', data.token);
          this._onChange(true);
          cb(null, data);
        }

      }.bind(this)
    });

  },

  signup: function(form, cb) {
    $.ajax({
      method: 'post',
      url: '/register',
      data: form,
      success: function(data) {
        console.log('res data! ', data);
        
        if(data.authenticated && data.token) {
          localStorage.setItem('token', data.token);
          this._onChange(true);
          cb(null, data);
        }

      }.bind(this)
    });
  },

  getToken: function () {
    return localStorage.getItem('token');
  },
  logout: function (cb) {
    localStorage.removeItem('token');
    if(cb) cb();
    this.onChange(false);
  },
  loggedIn: function () {
    return !!localStorage.getItem('token');
  },
  _onChange: function () {}

};

module.exports = auth;

