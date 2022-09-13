import React, { useState } from "react";
import "./App.css";
import Calculator from "./widgets/components/Calculator.tsx";
import DragAndDrop from "./widgets/components/DragAndDrop.tsx";
import Weather from "./widgets/components/Weather.jsx";
import Crypto from "./widgets/components/Crypto.tsx";
import WidgetMenu from "./widgets/components/WidgetMenu.tsx";
import News from "./widgets/components/News.tsx";

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
      component: <News />,
      open: false,
      id: "stocks",
    },
  ];

  const [widgetsArray, updateWidgetsArray] = useState(widgets);
  const [key, setKey] = useState(0);

  const handleCloseButton = (event, id, open) => {
    const found = widgetsArray.findIndex((element) => {
      return element.id === id;
    });
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
        handleIconClick={handleCloseButton}
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
