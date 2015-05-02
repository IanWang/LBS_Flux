
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  createCheckIn: function(token) {
    console.log('2');
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_CREATE_CHECKIN,
      token: token
    });
  },

  showCheckFeed: function(text) {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_SHOW_CHECKIN_FEED, 
      text: text
    });
  }

};

module.exports = AppActions;
