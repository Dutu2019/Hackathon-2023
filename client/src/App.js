import "./App.css";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/SignUp";

import User from "./Contexts/User";

export const UserContext = createContext();

function App() {
  return (
    <div className="App">
      <User>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </User>
    </div>
  );
}

export default App;
