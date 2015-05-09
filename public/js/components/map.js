var React = require('react/addons');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;
var assign = require('object-assign');


var MapWindow = require('./mapWindow');


var GoogleMapMarkers = React.createClass({

  getInitialState: function() {
    return {
      center: new LatLng(25.047908, 121.517315), // taipei main station
      zoom: 15,
      markers: []
    };
  },

  componentWillReceiveProps: function(props) {

    if(props.places) {
      
      var markers = props.places.map(function(ele, index) {
        return {
          position: new LatLng(ele.lat, ele.lng),
          name: ele.name,
          id: ele.id
        };
      });

      this.setState({
        markers: markers
      });
    }

  	this.setState({
      center: new LatLng(props.myLocation.lat, props.myLocation.lng)
    });
  },

  renderMarkers: function(state, index) {
    var that = this;
    return (
      <Marker 
      	position={state.position} 
      	key={index} 
        onClick={that.handleMarkerClick.bind(that, index)}/>
    );
  },

  handleMarkerClick: function(index, evt) {


  },

  // not using yet!
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
