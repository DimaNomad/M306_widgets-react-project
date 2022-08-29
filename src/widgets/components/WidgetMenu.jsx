import React from "react";
import { BsCalculatorFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiBitcoinsv } from "react-icons/si";
import { useState } from "react";
import Calculator from "./Calculator";
import Weather from "./Weather";
import "../style/WidgetMenu.css";
import "../../App.css";

const WidgetMenu = () => {
  const [hiddenCalculator, setHiddenCalculator] = useState(false);
  const [hiddenWeather, setHiddenWeather] = useState(false);
  const [hiddenCrypto, setHiddenCrypto] = useState(false);

  return (
    <div className="App">
      <div className="widgetMenu">
        <button
          className="widgetButton"
          onClick={() => setHiddenCalculator(!hiddenCalculator)}
        >
          <BsCalculatorFill size={25} />
        </button>
        <button
          className="widgetButton"
          onClick={() => setHiddenWeather(!hiddenWeather)}
        >
          <TiWeatherPartlySunny size={25} />
        </button>
        <button
          className="widgetButton"
          onClick={() => setHiddenCrypto(!hiddenCrypto)}
        >
          <SiBitcoinsv size={25} />
        </button>
      </div>
      {hiddenCalculator && <Calculator />}
      {hiddenWeather && <Weather />}
    </div>
  );
};

export default WidgetMenu;
