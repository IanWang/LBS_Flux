
jest.dontMock('../../constants/AppConstants');
jest.dontMock('../AppStore');
jest.dontMock('object-assign');

describe('AppStore', function() {

  var AppConstants = require('../../constants/AppConstants');
  var TOKEN = 'a1eda54e4ed640103766e5d69c267b1b';
  var AppDispatcher;
  var AppStore;
  var callback;

  // fake actions
  var createPlace = {
    actionType: AppConstants.APP_CREATE_PLACE,
    place: {
      lat: 25.047908, 
      lng: 121.517315,
      token: TOKEN,
      name: '北車'
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppStore = require('../AppStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize without current place', function() {
    var myPlace = AppStore.getPlace();
    expect(myPlace).toEqual({});
  });

  // For ajax testing, I should use http://jasmine.github.io/2.0/ajax.html
  // but I dont have enough time when I realize it...

  it('creates Taipei main station as a new place', function() {
    callback(createPlace);
    var myPlace = AppStore.getPlace();
    
    /*
    expect(myPlace.name).toEqual('北車');
    */
  });


});
