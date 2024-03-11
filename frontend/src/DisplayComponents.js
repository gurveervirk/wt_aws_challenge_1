import React, { useState } from 'react';
import { Link} from 'react-router-dom'; // Import React Router components

function DisplayComponents(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Challenge 1</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/getData" className="nav-link">Get Data</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );

}

export default DisplayComponents;