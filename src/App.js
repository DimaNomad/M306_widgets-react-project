import React from "react";
import "./App.css";
import Calculator from "./widgets/components/Calculator";
import Weather from "./widgets/components/Weather";

function App() {
  return (
    <div className="App">
      <Calculator></Calculator>
      <Weather />

      <div className="container glass">
      </div>
      <div className="container glass"></div>
      <div className="container glass"></div>
    </div>
  );
}

export default App;
