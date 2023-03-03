import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; 
import Table from './Table';
import Form from './Form';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map() {
  const lng_default = -120.66318847361558;
  const lat_default = 35.303280314081285;
  const zoom_default = 14;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(lng_default);
  const [lat, setLat] = useState(lat_default);
  const [zoom, setZoom] = useState(zoom_default);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );

}

export default Map;
