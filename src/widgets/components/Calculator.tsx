import React, { useRef, useEffect, useState } from "react";
import "../style/Calculator.css";
import { btns, BTN_ACTIONS, btn_keys } from "./btnsConfig";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

const Calculator = () => {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState("");

  useEffect(() => {
    if (btnsRef.current) {
      const btns = Array.from(
        (btnsRef.current as any).querySelectorAll("button")
      );
      btns.forEach((e: any) => (e.style.height = e.offsetWidth + "px"));
    }
  }, []);

  const useKeyPress = (callback: any, targetKeys: any) => {
    useEffect(() => {
      const handleKey = (e: any) => {
        const isPresent = targetKeys.find((element: any) => {
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

  const handleKeyPress = (e: any) => {
    const found = btns.find((element) => {
      return element.key === e.key;
    });
    console.log(found);
    btnClick(found);
  };

  const btnClick = (item: any) => {
    const expDiv = expRef.current as any;

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);

      const oper = item.display !== "x" ? item.display : "*";
      setExpression(expression + oper);
    }

    if (item.action === BTN_ACTIONS.DIVIDE) {
      const divide = "1/";
      setExpression(divide + expression);
    }

    if (expDiv) {
      if (item.action === BTN_ACTIONS.DELETE) {
        expDiv.parentNode.querySelector("div:last-child").innerHTML = "";
        expDiv.innerHTML = "";

        setExpression("");
      }

      if (item.action === BTN_ACTIONS.DELETELAST) {
        const exp = expression.slice(0, -1);
        deleteLastSpan();
        setExpression(exp);
        console.log(exp);
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
          let res = math.evaluate(expression);

          setExpression(res);
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
    }
  };
  const deleteLastSpan = () => {
    const expDiv = expRef.current as any;
    const lastSpan = expDiv.lastChild;

    // setTimeout(() => {
    //   lastSpan.style.width = "0";
    //   lastSpan.style.opacity = "0";
    // }, 100);

    expDiv.removeChild(lastSpan);
  };

  const addAnimSpan = (content) => {
    const expDiv = expRef.current as any;
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
    )
  );
};
export default Calculator;
