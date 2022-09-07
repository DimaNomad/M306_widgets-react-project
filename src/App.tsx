import React, { useState } from "react";
import "./App.css";
import Calculator from "./widgets/components/Calculator.tsx";
import DragAndDrop from "./widgets/components/DragAndDrop.tsx";
import Weather from "./widgets/components/Weather.jsx";
import Crypto from "./widgets/components/Crypto.tsx";
import WidgetMenu from "./widgets/components/WidgetMenu.tsx";
import Stocks from "./widgets/components/Stocks.tsx";

const App = () => {
  const widgets = [
    {
      component: <Calculator />,
      open: false,
      id: "calculator",
    },
    {
      component: <Weather />,
      open: false,
      id: "weather",
    },
    {
      component: <Crypto />,
      open: false,
      id: "crypto",
    },
    {
      component: <Stocks />,
      open: false,
      id: "stocks",
    },
  ];

  const [widgetsArray, updateWidgetsArray] = useState(widgets);
  const [key, setKey] = useState(0);

  const handleCloseButton = (event, id, open) => {
    console.log("clicked");
    const found = widgetsArray.findIndex((element) => {
      return element.id === id;
    });
    console.log(found);
    if (found >= 0) {
      widgetsArray[found].open = !open;
      setKey(key + 1);
    }
  };
  const handleIconClick = (event, id, open) => {
    console.log("clicked");
    const found = widgetsArray.findIndex((element) => {
      return element.id === id;
    });
    console.log(found);
    if (found >= 0) {
      widgetsArray[found].open = !open;
      setKey(key + 1);
    }
  };

  function handleOnDragEnd(result) {
    const items = Array.from(widgetsArray);
    const [recordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItem);

    updateWidgetsArray(items);
  }

  return (
    <div className="App">
      <WidgetMenu
        widgetArray={widgetsArray}
        handleIconClick={handleIconClick}
      />
      <DragAndDrop
        handleCloseButton={handleCloseButton}
        widgetArray={widgetsArray}
        handleOnDragEnd={handleOnDragEnd}
      />
    </div>
  );
};

export default App;
