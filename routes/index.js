var express = require('express');
var request = require('request');
var router = express.Router();

var api = 'https://commandp-lbs-backend.herokuapp.com/api/v1/';

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

		console.log(body);

		res.send('ok');

	});
});

module.exports = router;
