import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
import './i18n';

var firebaseConfig = {
  apiKey: "AIzaSyDj7fuR-m413SClO_dqADqKhb_6plj4Hiw",
  authDomain: "untestedcoronaheatmap.firebaseapp.com",
  databaseURL: "https://untestedcoronaheatmap.firebaseio.com",
  projectId: "untestedcoronaheatmap",
  storageBucket: "untestedcoronaheatmap.appspot.com",
  messagingSenderId: "229170570386",
  appId: "1:229170570386:web:cf62a980b95383733c324b",
  measurementId: "G-GE40ML456P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
<Suspense fallback="loading">
  <App />
</Suspense>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
