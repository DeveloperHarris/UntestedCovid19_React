import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import AddCase from "./AddCase";
import firebase from "firebase";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.0902,
      lng: -95.7129
    },
    zoom: 0
  };

  state = {
    data: []
  };

  createMapOptions = maps => {
    return {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };
  };

  componentDidMount = () => {
    let db = firebase.firestore();
    let tempData = [];

    db.collection("unconfirmed_cases")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let newObj = {
            lat: doc.data().lat,
            lng: doc.data().lng
          };
          tempData.push(newObj);
        });
      })
      .then(() => {
        this.setState({ data: tempData });
      });
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: window.innerHeight, width: window.innerWidth }}>
        <GoogleMapReact
          key={this.state.data}
          options={this.createMapOptions}
          bootstrapURLKeys={{ key: "AIzaSyDGt6HmbX6CXrxxFJGtoR69vxI7JyNIg3E" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={{
            positions: this.state.data,
            options: { radius: 20, opacity: 0.6 }
          }}
        ></GoogleMapReact>
        <AddCase />
      </div>
    );
  }
}

export default SimpleMap;
