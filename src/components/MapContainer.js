import "../App";
import React, {Component} from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";

//Paste your API key here:
const API_KEY = "AIzaSyBZc-HHEjnizREs18ClWj08edyomTsv9hM";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 17.44,
      latitude: 44.053,
      zoom: 14,
      elevations: [],
      elevation: 0,
      resolution: 0,
      hide: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.id === "latitude") {
      this.setState({
        latitude: parseFloat(e.target.value),
        hide: true
      });
    } else if (e.target.id === "zoom") {
      this.setState({
        zoom: parseInt(e.target.value),
        hide: true
      });
    } else {
      this.setState({
        longitude: parseFloat(e.target.value),
        hide: true
      });
    }
  }

  updateLocation(a, b, c) {
    this.setState({
      latitude: c.latLng.lat(),
      longitude: c.latLng.lng(),
      hide: true
    })
  }

  zoomHandler(map, eventData) {
    this.setState({
      zoom: parseInt(eventData.zoom)
    });
  }

  find() {
    var that = this;
    //instantiate new window.google.maps object
    var elevator = new window.google.maps.ElevationService();
    console.log(elevator);
    elevator.getElevationForLocations({
      locations: [
        {
          lat: this.state.latitude,
          lng: this.state.longitude
        }
      ]
    }, function (results, status) {
      if (status === "OK") {
        console.log("Elevation results are:");
        console.log(results);
        that.setState({
          elevations: results.map(result => result),
          elevation: results[0].elevation,
          resolution: results[0].resolution,
          hide: false
        });
        //if you look at the api response, you can see that
        //lat and lng are funcions, so retrieve then like:
        console.log(that.state.elevations[0].location.lat());
      } else {
        alert("status");
      }
    });
  }

  render() {
    return (<div className="map-container">
      <div className="map-container__input_wrapper">
        <div className="map-container__results" style={{
            opacity: this.state.hide
              ? "0"
              : null
          }}>
          <h3>Your current data:</h3>
          Elevation: {this.state.elevation}
          [meters]
          <br/>
          Resoultion: {this.state.resolution}
        </div>
        <h3>Enter Coordinates:</h3>
        <div>
          <label htmlFor="latitude" className="map-container__label">
            Latitude
          </label>
          <input type="number" id="latitude" onChange={this.handleChange} value={this.state.latitude} className="map-container__input"/>
          <label htmlFor="longitude" className="map-container__label">
            Longitude
          </label>
          <input type="number" id="longitude" onChange={this.handleChange} value={this.state.longitude} className="map-container__input"/>
          <label htmlFor="zoom" className="map-container__label">
            Zoom
          </label>
          <input type="number" id="zoom" onChange={this.handleChange} value={this.state.zoom} className="map-container__input"/>
        </div>
        <button className="map-container__button" onClick={this.find.bind(this)}>
          Find Elevation
        </button>
      </div>

      <div className="map-container__map">
        <Map google={this.props.google} zoom={this.state.zoom} style={mapStyles} center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }} initialCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }} ter="ter" onZoomChanged={this.zoomHandler.bind(this)} onClick={this.updateLocation.bind(this)}/>
      </div>
    </div>);
  }
}

export default GoogleApiWrapper({apiKey: API_KEY})(MapContainer);
