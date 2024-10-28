import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">History</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">More</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
