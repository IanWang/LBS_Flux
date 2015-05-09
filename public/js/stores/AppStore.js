var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var auth = require('./auth');
var CHANGE_EVENT = 'change';

// will be passed back to root react app.
var _myLocation = {};
var _checkIns = {};

var TOKEN = auth.getToken();

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

function getLocation(cb) {
	if(!navigator.geolocation) return;
	navigator.geolocation.getCurrentPosition(function(pos) {
		var res = {
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
    },
    error: function(err) {
      alert('Operation Failed');
    }
  });
}


function createPlace(place, cb) {
  
  var form = assign(place, {token: TOKEN});
  
  $.ajax({
    method: 'post',
    url: '/place',
    data: form,
    success: function(data) {
      console.log('create place response: ', data);
      cb(data);
    },
    error: function(err) {
      alert('Operation Failed!');
    }
  });

}

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case AppConstants.APP_GET_LOCATION:
      getLocation(function(res) {
        _myLocation = res;
        AppStore.emitChange();
      });
      break;

    case AppConstants.APP_CREATE_PLACE:
      createPlace(action.place, function(res) {
        console.log('res from dispatcher: ', res);
        AppStore.emitChange();  
      });
      break;

    case AppConstants.APP_SHOW_CHECKIN_FEED:
      
      AppStore.emitChange();
      break;

    default: // do nothing
    
  }
});

module.exports = AppStore;