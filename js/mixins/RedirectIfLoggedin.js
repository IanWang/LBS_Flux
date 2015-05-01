var auth = require('../services/auth');

var RedirectIfLoggedin = {
  statics: {
    willTransitionTo: function (transition) {
      if ( auth.loggedIn()) {
        transition.redirect('/dashboard');
      }
    }
  }
};

module.exports = RedirectIfLoggedin;