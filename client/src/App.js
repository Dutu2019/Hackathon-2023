import "./App.css";
import Router from "./Router";
import User from "./Contexts/User";
import Socket from "./Contexts/Socket";

function App() {
  return (
    <div className="App">
      <User>
        <Socket>
          <Router />
        </Socket>
      </User>
    </div>
  );
}

export default App;
