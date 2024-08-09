// Navbar.js
import React from 'react';
import './Navbar.css';
import logo from '../assets/react.svg'; // Make sure you have the logo image in the assets folder

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Buddha Air Logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="/book">Book</a></li>
        <li><a href="/ticket-status">Ticket Status</a></li>
        <li><a href="/route-flight">Flight Routes</a></li>
      </ul>
      <div className="navbar-login">
        {localStorage.getItem("userId")  && <a onClick={()=>{localStorage.clear();window.location.reload();}}>logout</a>}
        {!localStorage.getItem("userId")  &&   <a href="Login">Login</a>}


      
       
      </div>
    </div>
  );
}

export default Navbar;
