// import React from 'react';
// import Geolocation from '@react-native-community/geolocation';
// import logo from './logo.svg';
// import './App.css';
// import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 

// Doesn't work yet


// function App() {
//   Geolocation.getCurrentPosition(info => document.getElementById("latitude").innerHTML = info.coords.latitude);
//   Geolocation.getCurrentPosition(info => document.getElementById("longitude").innerHTML = info.coords.longitude);
//   Geolocation.getCurrentPosition(info => sendCoords(info.coords, "localhost:8090"));
//   return (
//     <div sclassName="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Latitude:</p>
//         <p id="latitude"></p>
//         <p>Longitude:</p>
//         <p id="longitude"></p>
//         <p id="position">this is cool</p>
//         {/* <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p> */}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App; 

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import $ from "jquery";
import Geolocation from '@react-native-community/geolocation';
import { geolocated } from "react-geolocated";
import MyGreatPlace from './MyGreatPlace.js';


// const AnyReactComponent = ({ text }) => <div>{text}</div>;

function sendCoords(coords, url) {
  var xmlhttp = new XMLHttpRequest();
  // $.ajax({
  //   type : "GET", 
  //   url : "https://rawpythontest.r2dev2bb8.repl.co/", 
  //   beforeSend: function(xhr){xhr.setRequestHeader("Coords", coords.latitude.toString() + ' ' + coords.longitude.toString())},
  //   success : function(result) { 
  //       console.log(result.responseText);
  //   }, 
  //   error : function(result) { 
  //     console.log(result.responseText);
  //   } 
  // }); 
  
  xmlhttp.open("POST", url);  
  xmlhttp.setRequestHeader("coords", coords.latitude.toString() + ' ' + coords.longitude.toString());
  xmlhttp.send(coords.latitude.toString() + ' ' + coords.longitude.toString());
  console.log(xmlhttp.responseText);
	console.log("sent: " + coords.latitude.toString() + ' ' + coords.longitude.toString());
}

function parseCoords(coords) {
  latlon = coords.slice(1, -1).split(', ');
  lat = parseFloat(latlon[0]);
  lon = parseFloat(latlon[1]);
  return {
    "latitude": lat,
    "longitude": lon
  };
}

function getCoords(coords, url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url);  
  xmlhttp.setRequestHeader("Coords", coords.latitude.toString() + ' ' + coords.longitude.toString());
  xmlhttp.send(coords.latitude.toString() + ' ' + coords.longitude.toString());
  newcoords = xmlhttp.split('\n')
  for (var i=0; i<newcoords.length; i++) {
    newcoords[i] = parseCoords(newcoords[i]);
  }
  return xmlhttp.responseText;
}
// xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

class SimpleMap extends Component {
  // double latitude;
 
  // SimpleMap() {
  //   latitude = 0.0;
  // }
  constructor(props) {
    super(props);
    this.state = {latitude: 0.0, longitude: 0.0};
  

    
  }
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11
  };
  render() {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
    //     sendCoords(this.state, "https://RawPythonTest.r2dev2bb8.repl.co");
    //   })
    // this.setState({latitude: this.props.latitude, longitude: this.props.longitude});
    if (this.props.coords)  {
      sendCoords(this.props.coords, "https://RawPythonTest.r2dev2bb8.repl.co");
      console.log(getCoords(this.props.coords, "https://RawPythonTest.r2dev2bb8.repl.co"));
    }
  

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
          <MyGreatPlace lat={this.props.coords.latitude} lng={this.props.coords.longitude} /* Kreyser Avrora */ />
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
