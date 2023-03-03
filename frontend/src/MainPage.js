import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Button from '@mui/material/Button';

function MainPage() {
  return (

    <div className="container">
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
      <BrowserRouter basename="/">
        <nav>
          <ul>
            <li>
              <Link to="/app">List all</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/app"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default MainPage;
