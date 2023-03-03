import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import Map from "./Map";
import MainPage from "./MainPage";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <MainPage />
  </React.StrictMode>,
  document.getElementById("root")
);
