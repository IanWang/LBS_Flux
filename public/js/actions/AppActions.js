
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  getLocation: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_GET_LOCATION
    });
  },

  createPlace: function(place) {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_CREATE_PLACE,
      place: place
    });
  },

  createCheckIn: function(placeId, comment) {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_CREATE_CHECKIN,
      placeId: placeId,
      comment: comment
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
