
jest.dontMock('../../constants/AppConstants');
jest.dontMock('../AppStore');
jest.dontMock('object-assign');

describe('AppStore', function() {

  var AppConstants = require('../../constants/AppConstants');
  var AppDispatcher;
  var AppStore;
  var callback;

  // mock actions
  var actionAppGetLocation = {
    actionType: AppConstants.App_GET_LOCATION
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppStore = require('../AppStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });


});
