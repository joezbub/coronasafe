import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import logo from './logo.svg';
import './App.css';


// Doesn't work yet
function sendCoords(coords, url) {
	console.log(url);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xmlhttp.send(coords.latitude.toString() + ' ' + coords.longitude.toString());
	console.log("sent");
}

function App() {
  Geolocation.getCurrentPosition(info => console.log(info));
  Geolocation.getCurrentPosition(info => sendCoords(info.coords, "localhost:8090"));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; 
