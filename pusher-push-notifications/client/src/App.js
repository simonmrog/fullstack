import { useRef } from "react";
import "./App.css";

import BeamsClient from "./services/beams.js";

function App() {

  const beamsClient = useRef();

  async function login() {
    beamsClient.current = new BeamsClient("1");
    beamsClient.current.start();
  }

  async function logout() {
    await beamsClient.current.stop();
  }

  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
