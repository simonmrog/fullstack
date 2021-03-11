import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import BeamsClient from "./services/beams.js";

function App() {

  useEffect(() => {
    const beamsClient = new BeamsClient("user_id");
    beamsClient.start();
    return async function cleanup() {
      await beamsClient.stop();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
