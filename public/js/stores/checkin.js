var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _checkIns = {};


var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _checkIns;
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
    console.log('a', res);
    cb(res);
	});
}

function getNearPlace(position) {

	$.ajax({
    method: 'post',
    url: '/near',
    data: position,
    success: function(data) {
      console.log('res data! ', data);
    }
  });

}

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  var token = action.token;

  switch(action.actionType) {
    case AppConstants.APP_CREATE_CHECKIN:
      getLocation(token, function(res) {
        getNearPlace(res);
      });
      AppStore.emitChange();
      break;

    case AppConstants.APP_SHOW_CHECKIN_FEED:
      
      AppStore.emitChange();
      break;

    default:
    
  }
});

module.exports = AppStore;