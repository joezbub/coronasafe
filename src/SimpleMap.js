

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { geolocated } from "react-geolocated";
import MyGreatPlace from './MyGreatPlace.js';



//Sends current coordinates to url
function sendCoords(coords, url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url);  
  xmlhttp.setRequestHeader("coords", coords.latitude.toString() + ' ' + coords.longitude.toString());
  xmlhttp.send(coords.latitude.toString() + ' ' + coords.longitude.toString());
  console.log(xmlhttp.responseText);
	console.log("sent: " + coords.latitude.toString() + ' ' + coords.longitude.toString());
}
//Formats coordinates for rendering
function parseCoords(coords) {
  var latlon = coords.slice(1, -1).split(', ');
  var lat = parseFloat(latlon[0]);
  var lon = parseFloat(latlon[1]);
  return {
    "latitude": lat,
    "longitude": lon
  };
}
//Sends a request to the server in order to get coordinates of every point
function getCoords(coords, url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url);  
  xmlhttp.setRequestHeader("Coords", coords.latitude.toString() + ' ' + coords.longitude.toString());
  xmlhttp.send(coords.latitude.toString() + ' ' + coords.longitude.toString());
  var newcoords = xmlhttp.response.split('\n');
  for (var i=0; i<newcoords.length; i++) {
    newcoords[i] = parseCoords(newcoords[i]);
  }
  return newcoords;
}
// Not used -> form posting 
// xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 0.0, longitude: 0.0};
  }
  // create points on maps
  createPoints(url, coords) {
      var coordsList =  getCoords(coords, url);
      var table = []
      for (var i=0; i< coordsList.length; i++) {
        table.push(<MyGreatPlace lat={coordsList[i].latitude} lng={coordsList[i].longitude} />);
      }
      return table;

  }
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11
  };
  render() {
    // testing code
    // Geolocation.getCurrentPosition(
    //   position => {
    //     this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
    //     sendCoords(this.state, "https://RawPythonTest.r2dev2bb8.repl.co");
    //   })
    // this.setState({latitude: this.props.latitude, longitude: this.props.longitude});
    // if (this.props.coords)  {
    //   sendCoords(this.props.coords, "https://RawPythonTest.r2dev2bb8.repl.co");
    //   console.log(getCoords(this.props.coords, "https://RawPythonTest.r2dev2bb8.repl.co"));
    // } 

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : this.props.coords ? (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDTz5KwujIjzE6RRCnaJ5ZoZSroy4vdz-0"}}
          defaultCenter={{lat: this.props.coords.latitude, lng: this.props.coords.longitude}}
          defaultZoom={16}
        >
          {this.createPoints('https://RawPythonTest.r2dev2bb8.repl.co', this.props.coords)}
          {/* <MyGreatPlace lat={this.props.coords.latitude} lng={this.props.coords.longitude} /> */}
          {/* <AnyReactComponent
            lat={this.state.latitude}
            lng={this.state.longitude}
            text="My Marker"
          />  */}
        </GoogleMapReact>
      </div>
      ) : (
        <div>Getting the location data&hellip; </div>
    );
  }
}
export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SimpleMap);
