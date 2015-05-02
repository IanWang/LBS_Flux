var auth = require('../services/auth');
var Login = require('../components/Login');

var Authentication = {
  statics: {
    willTransitionTo: function (next) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = next;
        next.redirect('/login');
      }
    }
  }
};

module.exports = Authentication;