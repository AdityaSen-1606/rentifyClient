import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Make sure the path is correct

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="logo">Rentify</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/seller-dashboard">Seller Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
