var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();

var api = 'https://commandp-lbs-backend.herokuapp.com/api/v1';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req, res) {
	
	var form = req.body;

	request.post({
		url: api + '/register',
		formData: form
	}, function(err, httpRes, body) {

		var data = JSON.parse(body);

		console.log(data);

		res.send({
			authenticated: true,
			username: data.user.username,
			token: data.access_token	
		});

	});
});


router.put('/login', function(req, res) {
	
	var form = req.body;
	request.put({
		url: api + '/login',
		formData: form
	}, function(err, httpRes, body) {

		var data = JSON.parse(body);

		console.log(data);

		/* TO BE FIXED
		setDevice(data.access_token, function(device) {
			console.log('device ', device);
			res.send(...);
		})
		*/		
		res.send({
			authenticated: true,
			username: data.user.username,
			token: data.access_token	
		});
	});
});


router.post('/near', function(req, res) {

	var form = {
		lat: req.body.lat,
		lng: req.body.lng,
		token: req.body.token
	};
	
	console.log(form);

	request.get({
		url: api + '/places/near',
		qs: form
	}, function(err, httpRes, body) {
		console.log(body);
		res.send(body);
	})
	
});

// not working right now!
/*
function setDevice(token, callback) {
	async.series([
		function(cb) {
			request.get(api + '/who', function(err, res, body) {
				
				var deviceInfo = JSON.parse(body);
				console.log(deviceInfo);
				cb(null, deviceInfo);
			});
		},
		function(device, cb) {

			var form = {
				token: token,
				device: {
					device_type: device.os,
					os_version: device.os_version
				}
			};
			
			// failed here, somehow..
			request.post({
				url: api + '/my/devices',
				formData: form
			}, function(err, res, body) {
				console.log('as2 ' + body);
				cb(null, body);
			});
		}
	], function(err, result) {
		callback(err, result);
	});
}
*/

module.exports = router;
