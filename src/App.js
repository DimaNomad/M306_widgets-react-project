import React from "react";
import "./App.css";
import Calculator from "./widgets/components/Calculator";
import Weather from "./widgets/components/Weather";
import Crypto from "./widgets/components/Crypto";

function App() {

  return (
    <div className="App">
      <Calculator></Calculator>
      <div className="container glass">
      <Crypto />
      </div>
      <div className="container glass"></div>
      <div className="container glass"></div>
    </div>
  );
}

export default App;
