import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import AddCase from "./AddCase";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.0902,
      lng: -95.7129
    },
    zoom: 3
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDGt6HmbX6CXrxxFJGtoR69vxI7JyNIg3E" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        ></GoogleMapReact>
        <AddCase />
      </div>
    );
  }
}

export default SimpleMap;
