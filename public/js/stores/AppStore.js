var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var auth = require('./auth');
var CHANGE_EVENT = 'change';

// will be passed back to root react app.
var _myLocation = {};
var _myPlace = {};
var _nearPlaces = {};
var _checkIns = {};

var TOKEN = auth.getToken();

var AppStore = assign({}, EventEmitter.prototype, {

  getLocation: function() {
    return _myLocation;
  },

  getPlace: function() {
    return _myPlace;
  },

  getNearPlace: function() {
    return _nearPlaces;
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
	if(!navigator.geolocation) {
    return {
      lat: 25.047908, 
      lng: 121.517315,
      radius: 5,
      token: TOKEN
    }
  }
	navigator.geolocation.getCurrentPosition(function(pos) {
		var res = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
      radius: 5,
      token: TOKEN
		};
    cb(res);
	});
}

function getNearPlace(position, cb) {
	$.ajax({
    method: 'post',
    url: '/near',
    data: position,
    success: function(data) {
      console.log('near places ', data);
      cb(data);
    },
    error: function(err) {
      alert('Operation Failed');
    }
  });
}


function createPlace(place, cb) {
  
  // if postion comes from click on map
  place = place.A ? {
    lat: place.A,
    lng: place.F,
    name: place.name
  } : place;

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

function createCheckIn(placeId, comment, cb) {

  var form = {
    placeId: placeId,
    comment: comment,
    token: TOKEN
  };

  $.ajax({
    method: 'post',
    url: '/checkin',
    data: form,
    success: function(data) {
      console.log('create checkIn response: ', data);
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
      
      getLocation(function(location) {
        _myLocation = location;

        getNearPlace(_myLocation, function(res) {
          _nearPlaces = res.places;
          AppStore.emitChange();  
        });

      });

      break;

    case AppConstants.APP_CREATE_PLACE:
      createPlace(action.place, function(res) {
        _myPlace = {
          name: res.place.name,
          id: res.place.id
        };
        AppStore.emitChange();  
      });
      break;


    case AppConstants.APP_CREATE_CHECKIN:
      createCheckIn(action.placeId, action.comment, function(res) {
        AppStore.emitChange();
      });
      break;

    default: // do nothing
    
  }
});

module.exports = AppStore;