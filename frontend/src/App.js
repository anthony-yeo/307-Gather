import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Table from './Table';
import Form from './Form';
import Login from './Login';
import CreateAccount from './CreateAccount';
import axios from 'axios';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-120.66318847361558);
  const [lat, setLat] = useState(35.303280314081285);
  const [zoom, setZoom] = useState(14);
  const [characters, setCharacters] = useState([]);

  /*useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });*/

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // return (
  //   <div>
  //     <div className="sidebar">
  //       Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
  //     </div>
  //     <div ref={mapContainer} className="map-container" />
  //   </div>
  // );

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    const person = characters[index];
    //const _id=person['_id'];
    //const response = axios.delete(`http://localhost:5000/users/${id}`);
    setCharacters(updated);
  }
  /*function updateList(person) {
    setCharacters([...characters, person]);
  }*/
  function updateList(person) {
    makePostCall(person).then( result => {
    if (result && result.status === 201)
       setCharacters([...characters, result.data] );
    });
 }
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error);
       return false;
    }
 }
 useEffect(() => {
  fetchAll().then( result => {
     if (result)
        setCharacters(result);
   });
}, [] );
async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5000/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}
// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },
  // return (
  //   <div className="container">
  //     <Table characterData={characters} removeCharacter={removeOneCharacter} />
  //     {/*<Form handleSubmit={updateList} /> */}
  //     <Login />
  //     <CreateAccount />
  //   </div>
  // )
  return (
    <div className="container">
      <h1>Choose your path!</h1>
      <BrowserRouter basename="/">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/createaccount">CreateAccount</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/createaccount"
            element={
              <CreateAccount
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  }

export default App;
