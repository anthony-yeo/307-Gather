import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
function MainPage() {
  return (
    <div className="container">
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
