import React from "react";
import { BsCalculatorFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiBitcoinsv } from "react-icons/si";
import { AiOutlineStock } from "react-icons/ai";
import { useState, useEffect } from "react";
import "../style/WidgetMenu.css";
import "../../App.css";

interface WidgetMenuProps {
  widgetArray: any;
  handleIconClick: any;
}

const WidgetMenu: React.FC<WidgetMenuProps> = (props: WidgetMenuProps) => {
  const { widgetArray, handleIconClick } = props;

  const [isOpenWidgetMenu, setIsOpenWidgetMenu] = useState(false);

  useEffect(() => {
    const menuBtn = document.querySelector(".menu-btn");
    let menuOpen = false;
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        if (!menuOpen) {
          menuBtn.classList.add("open");
          menuOpen = true;
        } else {
          menuBtn.classList.remove("open");
          menuOpen = false;
        }
      });
    }
  }, [widgetArray]);

  const getOpenId = (array, id) => {
    const found = array.findIndex((element) => {
      return element.id === id;
    });
    if (found >= 0) {
      return array[found].open;
    }
  };
  return (
    <div className={isOpenWidgetMenu ? "menuBodyOpen" : "menuBody"}>
      <ul>
        <li>
          <button
            id="myInputID"
            className="widgetButton"
            onClick={(event) =>
              handleIconClick(
                event,
                "calculator",
                getOpenId(widgetArray, "calculator")
              )
            }
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          >
            <BsCalculatorFill size={35} />
          </button>
        </li>
        <li>
          <button
            className="widgetButton"
            onClick={(event) =>
              handleIconClick(
                event,
                "weather",
                getOpenId(widgetArray, "weather")
              )
            }
          >
            <TiWeatherPartlySunny size={40} />
          </button>
        </li>
        <li>
          <button
            className="widgetButton"
            onClick={(event) =>
              handleIconClick(event, "crypto", getOpenId(widgetArray, "crypto"))
            }
          >
            <SiBitcoinsv size={36} />
          </button>
        </li>
        <li>
          <button
            className="widgetButton"
            onClick={(event) =>
              handleIconClick(event, "stocks", getOpenId(widgetArray, "stocks"))
            }
          >
            <AiOutlineStock size={40} />
          </button>
        </li>
      </ul>
      <div
        className="menu-btn"
        onClick={() => setIsOpenWidgetMenu(!isOpenWidgetMenu)}
      >
        <div className="menu-btn__burger"></div>
      </div>
    </div>
  );
};

export default WidgetMenu;
