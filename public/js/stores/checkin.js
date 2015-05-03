var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// will be passed back to root react app.
var _myLocation = {};
var _checkIns = {};


var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _checkIns;
  },

  getLocation: function() {
    return _myLocation;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

function getLocation(token, cb) {
	if(!navigator.geolocation) return;
	navigator.geolocation.getCurrentPosition(function(pos) {
		var res = {
      token: token,
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
      radius: 100
		};
    cb(res);
	});
}

function getNearPlace(position) {

	$.ajax({
    method: 'post',
    url: '/near',
    data: position,
    success: function(data) {
      console.log('my position ', data);
    }
  });

}

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  var token = action.token;

  switch(action.actionType) {
    case AppConstants.APP_GET_LOCATION:
      getLocation(token, function(res) {
        _myLocation = res;
        console.log('b ', res);
        AppStore.emitChange();
      });
      break;

    case AppConstants.APP_CREATE_CHECKIN:
      
      AppStore.emitChange();
      break;

    case AppConstants.APP_SHOW_CHECKIN_FEED:
      
      AppStore.emitChange();
      break;

    default: // do nothing
    
  }
});

module.exports = AppStore;