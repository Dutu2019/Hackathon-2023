import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./Contexts/User";
import Popup from "./components/Popup/Popup";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/SignUp";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home"

export default function Router() {
  const user = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={
            user.isAuth ? (
              <Chat />
            ) : (
              <Popup>Please Log in to access the chat</Popup>
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
