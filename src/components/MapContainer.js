import React, {Component} from "react";
import "../App";
import {Map, GoogleApiWrapper} from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state={
      longitude: 17.44,
      latitude: 44.053
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
   if(e.target.id === 'latitude') {
    this.setState({
      latitude: e.target.value
    })
   } else {
    this.setState({
      longitude: e.target.value
    })
   }
  }

  find() {
    console.log('you are clicking the button sir');
  
  
  }

  
  render() {
    return (<div className="map-container">
      <div className="map-container__input">
        <h3>Enter Coordinates:</h3>
        <div>
        <label htmlFor="latitude" className="map-container__label" >Latitude</label>
        <input type="text" id="latitude" onChange={ this.handleChange } value={this.state.latitude} />
        <label htmlFor="longitude" className="map-container__label" >Longitude</label>
        <input type="text" id="longitude" onChange={ this.handleChange } value={this.state.longitude} />
        </div>
        <button onClick={this.find} >Find</button>
      </div>
      
      <div className="map-container__map">
        <Map google={this.props.google} zoom={12} style={mapStyles} center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }} 
          initialCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}  />
      </div>
    </div>);
  }
}

export default GoogleApiWrapper({apiKey: "AIzaSyDmTR-VjwH7X6Rr5XuJXgsyafEZuR6HHLE"})(MapContainer);
