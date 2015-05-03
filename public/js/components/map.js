var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;

var GoogleMapMarkers = React.createClass({

  getInitialState: function() {
    return {
      center: new LatLng(this.props.lat, this.props.lng),
      zoom: 13,
      markers: [
        {position: new LatLng(this.props.lat, this.props.lng)}
      ]
    };
  },

  componentWillReceiveProps: function(props) {
  	this.setState({
      center: new LatLng(props.lat, props.lng),
      zoom: 13,
      markers: [
        {position: new LatLng(props.lat, props.lng)}
      ]
    });
  },

  renderMarkers: function(state, i) {
    return (
      <Marker position={state.position} key={i} />
    );
  },

  handleMapClick: function(mapEvent) {
    var marker = {
      position: mapEvent.latLng
    };

    var markers = React.addons
      .update(this.state.markers, {$push: [marker]});

    this.setState({
      markers: markers,
      center: mapEvent.latLng
    });
  },

  handleCenterChange: function(map) {
    this.setState({
      center: map.getCenter()
    });
  },

  render: function() {
    return (
      <Map
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width={500}
        height={500}
        onClick={this.handleMapClick}>
        {this.state.markers.map(this.renderMarkers)}
      </Map>
    );
  }

});

module.exports = GoogleMapMarkers;
