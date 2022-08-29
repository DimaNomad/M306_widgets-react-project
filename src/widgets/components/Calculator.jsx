import React, { useRef, useEffect, useState } from "react";
import "../style/Calculator.css";
import { btns, BTN_ACTIONS, btn_keys } from "./btnsConfig";

const Calculator = () => {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState("");

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll("button"));
    btns.forEach((e) => (e.style.height = e.offsetWidth + "px"));
  }, []);

  const useKeyPress = (callback, targetKeys) => {
    useEffect(() => {
      const handleKey = (e) => {
        const isPresent = targetKeys.find((element) => {
          return element === e.key;
        });

        if (isPresent) {
          console.log(isPresent);
          callback(e);
        }
      };
      document.addEventListener("keydown", handleKey);
      return () => {
        document.removeEventListener("keydown", handleKey);
      };
    }, [callback, targetKeys]);
  };

  const handleKeyPress = (e) => {
    const found = btns.find((element) => {
      return element.key === e.key;
    });
    console.log(found);
    btnClick(found);
  };

  const btnClick = (item) => {
    const expDiv = expRef.current;

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);

      const oper = item.display !== "x" ? item.display : "*";
      setExpression(expression + oper);
    }

    if (item.action === BTN_ACTIONS.DIVIDE) {
      const divide = "1/";
      setExpression(divide + expression);
    }

    if (item.action === BTN_ACTIONS.DELETE) {
      expDiv.parentNode.querySelector("div:last-child").innerHTML = "";
      expDiv.innerHTML = "";

      setExpression("");
    }

    if (item.action === BTN_ACTIONS.CALC) {
      if (expression.trim().length <= 0) return;

      expDiv.parentNode.querySelector("div:last-child").remove();

      const cloneNode = expDiv.cloneNode(true);
      expDiv.parentNode.appendChild(cloneNode);

      const transform = `translateY(${
        -(expDiv.offsetHeight + 10) + "px"
      }) scale(0.4)`;

      try {
        let res = eval(expression);

        setExpression(res.toString());
        setTimeout(() => {
          cloneNode.style.transform = transform;
          expDiv.innerHTML = "";
          addAnimSpan(Math.floor(res * 100000000) / 100000000);
        }, 200);
      } catch {
        setTimeout(() => {
          cloneNode.style.transform = transform;
          cloneNode.innerHTML = "Syntax err";
        }, 200);
      } finally {
        console.log("calc complete");
      }
    }
  };

  const addAnimSpan = (content) => {
    const expDiv = expRef.current;
    const span = document.createElement("span");

    span.innerHTML = content;
    span.style.opacity = "0";
    expDiv.appendChild(span);

    const width = span.offsetWidth + "px";
    span.style.width = "0";

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.width = width;
    }, 100);
  };

  return (
    useKeyPress(handleKeyPress, btn_keys),
    (
      <div className="calculatorBody">
        <div className="calculator">
          <div className="calculator_result">
            <div ref={expRef} className="calculator_result_exp"></div>
            <div className="calculator_result_exp"></div>
          </div>
          <div ref={btnsRef} className="calculator_btns">
            {btns.map((item, index) => (
              <button
                key={index}
                className={item.class}
                onClick={() => btnClick(item)}
              >
                {item.display}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
export default Calculator;
