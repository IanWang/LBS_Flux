
var device = {

	getBrowserInfo: function(token) {
		$.getJSON('/who', function(res) {
			console.log('browser info: ', res);
		});
	},

	registerDevice: function(token, device) {

		var form = {
			TOKEN: token,
			device: {
				device_type: device.type,
				os_version: device.osVersion
			}
		};

		$.post('/devices', device, function(res) {

		});
	}

};

module.exports = device;

