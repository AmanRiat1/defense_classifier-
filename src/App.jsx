  import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
        <Main/>
      </div>
    </div>
  );
}

export default App;