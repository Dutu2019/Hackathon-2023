import "./App.css";
import { createContext, useContext } from "react";
import Router from "./Router";

import User from "./Contexts/User";

export const UserContext = createContext();

function App() {

  return (
    <div className="App">
      <User>
        <Router />
      </User>
    </div>
  );
}

export default App;
