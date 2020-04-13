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
import Geolocation from '@react-native-community/geolocation';
import MyGreatPlace from './MyGreatPlace.js';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function sendCoords(coords, url) {
	console.log(url);
	var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  xmlhttp.send(coords.latitude.toString() + ' ' + coords.longitude.toString());
  if (xmlhttp.readyState === 4) {
    if (xmlhttp.status === 200) {
      console.log(xmlhttp.responseText);
    }
  }
	console.log("sent");
}

class SimpleMap extends Component {
  // double latitude;
 
  // SimpleMap() {
  //   latitude = 0.0;
  // }
  constructor(props) {
    super(props);
    this.state = {longitude: 0.0, latitude: 0.0};
  }
  static defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11
  };
  
  render() {
      Geolocation.watchPosition(
        position => {
          this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
          sendCoords(this.state, "https://RawPythonTest.r2dev2bb8.repl.co");
        });
    console.log(this.state.longitude);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDTz5KwujIjzE6RRCnaJ5ZoZSroy4vdz-0"}}
          defaultCenter={{lat: this.state.latitude, lng: this.state.longitude}}
          defaultZoom={16}
        >
          <MyGreatPlace lat={this.state.latitude} lng={this.state.longitude} /* Kreyser Avrora */ />
          {/* <AnyReactComponent
            lat={this.state.latitude}
            lng={this.state.longitude}
            text="My Marker"
          />  */}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;