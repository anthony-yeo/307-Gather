import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import Map from "./Map";
import MainPage from "./MainPage";

ReactDOM.render(
  <React.StrictMode>
    <Map />
    <MainPage />
  </React.StrictMode>,
  document.getElementById("root")
);
