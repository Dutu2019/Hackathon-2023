import React from "react";
import { Link } from "react-router-dom";
import { FaChessKing } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="container">
        <FaChessKing className="icon" />

        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
