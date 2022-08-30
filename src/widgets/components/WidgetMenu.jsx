import React from "react";
import { BsCalculatorFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiBitcoinsv } from "react-icons/si";
import { AiOutlineStock } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import Calculator from "./Calculator";
import Weather from "./Weather";
import DragAndDrop from "./DragAndDrop.tsx";
import "../style/WidgetMenu.css";
import "../../App.css";

const WidgetMenu = () => {
  const [isOpenCalculator, setIsOpenCalculator] = useState(false);
  const [isOpenWeather, setIsOpenWeather] = useState(false);
  const [isOpenCrypto, setIsOpenCrypto] = useState(false);
  const [isOpenWidgetMenu, setIsOpenWidgetMenu] = useState(false);

  const [key, setKey] = useState(0);

  const widgets = [
    {
      component: <Calculator />,
      open: false,
      id: "calculator",
    },
    {
      component: <Weather />,
      open: true,
      id: "weather",
    },
  ];

  const [widgetsArray, updateWidgetsArray] = useState(widgets);

  function handleOnDragEnd(result) {
    const items = Array.from(widgetsArray);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    updateWidgetsArray(items);
  }
  useEffect(() => {
    const menuBtn = document.querySelector(".menu-btn");
    let menuOpen = false;
    menuBtn.addEventListener("click", () => {
      if (!menuOpen) {
        menuBtn.classList.add("open");
        menuOpen = true;
      } else {
        menuBtn.classList.remove("open");
        menuOpen = false;
      }
    });
  }, [widgetsArray]);
  return (
    <div className="App">
      {}
      <div className="menuBody">
        {isOpenWidgetMenu && (
          <div className="widget-menu">
            <button
              id="myInputID"
              className="widgetButton"
              onClick={() => {
                const found = widgetsArray.findIndex((element) => {
                  return element.id === "calculator";
                });
                if (found >= 0) {
                  widgetsArray[found].open = !widgetsArray[found].open;
                  setKey(key + 1);
                }
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            >
              <BsCalculatorFill size={40} />
            </button>
            <button
              className="widgetButton"
              onClick={() => setIsOpenWeather(!isOpenWeather)}
            >
              <TiWeatherPartlySunny size={40} />
            </button>
            <button
              className="widgetButton"
              onClick={() => setIsOpenCrypto(!isOpenCrypto)}
            >
              <SiBitcoinsv size={36} />
            </button>
            <button
              className="widgetButton"
              onClick={() => setIsOpenCrypto(!isOpenCrypto)}
            >
              <AiOutlineStock size={40} />
            </button>
          </div>
        )}
        <div
          class="menu-btn"
          onClick={() => setIsOpenWidgetMenu(!isOpenWidgetMenu)}
        >
          <div class="menu-btn__burger"></div>
        </div>
      </div>
      <DragAndDrop
        widgetArray={widgetsArray}
        handleOnDragEnd={handleOnDragEnd}
      />
    </div>
  );
};

export default WidgetMenu;
