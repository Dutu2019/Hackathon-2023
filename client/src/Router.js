import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popup from "./components/Popup/Popup";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/SignUp";
import Chat from "./components/Chat/Chat";
import { UserContext } from "./App";
import Board from "./components/Home/Board";

export default function Router() {
  const user = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Board />} />
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
