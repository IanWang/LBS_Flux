var React = require('react/addons');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;

var MapWindow = React.createClass({

	render: function() {

		return (
			<div id="content">
				<div id="siteNotice">notice</div>
				<h1 id="firstHeading" className="firstHeading">title</h1>
				<div id="bodyContent">content</div>
			</div>
		);
	}

});

module.exports = MapWindow;

/*
			<div id="content">
				<div id="siteNotice"></div>
				<h1 id="firstHeading" className="firstHeading">{this.state.title}</h1>
				<div id="bodyContent">{this.state.comment}</div>
			</div>
			*/