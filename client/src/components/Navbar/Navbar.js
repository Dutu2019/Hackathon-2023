import { React, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChessKing } from "react-icons/fa";
import { UserContext } from "../../App";
import Logout from "../Logout/Logout"
import "./Navbar.css";

export default function Navbar() {
  const user = useContext(UserContext);

  return (
    <div className="Navbar">
      <div className="container">
        <FaChessKing className="icon" />

        <div className="links">
          <Link to="/">Home</Link>
          {!user.isAuth ? <Link to="/login">Login</Link> : <Logout/>}
        </div>
      </div>
    </div>
  );
}
