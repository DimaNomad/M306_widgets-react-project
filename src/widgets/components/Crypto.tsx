import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "../style/Crypto.css";
import CryptoExtra from "./CryptoExtra.tsx";

const Crypto = () => {
  // const [currencies, setcurrencies] = useState([]);
  // const [pair, setpair] = useState("");
  // const [price, setprice] = useState("0.00");
  // const [pastData, setpastData] = useState({});
  // const ws = useRef(null);

  // let first = useRef(false);
  // const url = "https://api.pro.coinbase.com";

  // useEffect(() => {
  //   ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

  //   let pairs = [];

  //   const apiCall = async () => {
  //     await fetch(url + "/products")
  //       .then((res) => res.json())
  //       .then((data) => (pairs = data));

  //     let filtered = pairs.filter((pair) => {
  //       if (pair.quote_currency === "USD") {
  //         return pair;
  //       }
  //     });

  //     filtered = filtered.sort((a, b) => {
  //       if (a.base_currency < b.base_currency) {
  //         return -1;
  //       }
  //       if (a.base_currency > b.base_currency) {
  //         return 1;
  //       }
  //       return 0;
  //     });

  //     setcurrencies(filtered);

  //     first.current = true;
  //   };

  //   apiCall();
  // }, []);

  // useEffect(() => {
  //   if (!first.current) {

  //     return;
  //   }

  //   let msg = {
  //     type: "subscribe",
  //     product_ids: [pair],
  //     channels: ["ticker"]
  //   };
  //   let jsonMsg = JSON.stringify(msg);
  //   ws.current.send(jsonMsg);

  //   //TODO add historical data and format it for ChartJS

  //   // let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`; //86400 isch 1 Tag
  //   // const fetchHistoricalData = async () => {
  //   //   let dataArr = [];
  //   //   await fetch(historicalDataURL)
  //   //     .then((res) => res.json())
  //   //     .then((data) => (dataArr = data));

  //   //   let formattedData = formatData(dataArr);
  //   //   setpastData(formattedData);
  //   //   console.log(JSON.stringify(formattedData));
  //   // };

  //   // fetchHistoricalData();

  //   ws.current.onmessage = (e) => {
  //     let data = JSON.parse(e.data);
  //     if (data.type !== "ticker") {
  //       return;
  //     }

  //     if (data.product_id === pair) {
  //       setprice(data.price);
  //     }
  //   };
  // }, [pair]);

  // const handleSelect = (e) => {
  //   let unsubMsg = {
  //     type: "unsubscribe",
  //     product_ids: [pair],
  //     channels: ["ticker"]
  //   };
  //   let unsub = JSON.stringify(unsubMsg);

  //   ws.current.send(unsub);

  //   setpair(e.target.value);
  // };
  // TODO make show in center of widget
  const [listOfCoins, setListOfCoins] = useState([]);
  const [newListOfCoins, setNewListOfCoins] = useState([]);
  const [key, setKey] = useState(0);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&").then(
      (response) => {
        const newArr = response.data.coins;
        newArr.forEach((object: any) => {
          object.open = false;
        });
        setListOfCoins(newArr);
      }
    );
  }, []);

  const filteredList = listOfCoins.filter((coin: any) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  const handleRowClick = (arr: any, index) => {
    arr[index].open = !arr[index].open;
    setListOfCoins(arr);
    setKey(key + 1);
    // newList[index].open = !newList[index].open;
  };

  return (
    <div className="container glass">
      <div className="cryptoHeader">
        <input
          className="input"
          type="text"
          placeholder="Enter coin name..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        ></input>
      </div>
      <div className="cryptoDisplay">
        <div className="legend">
          <p>Name</p>
          <p>Price</p>
          <p>24h Change</p>
        </div>
        {filteredList.map((coin: any, index) => {
          return (
            <div>
              <div
                id={coin.name}
                className="cryptoRow"
                onClick={() => handleRowClick(listOfCoins, index)}
              >
                <img className="cryptoIcon" src={coin.icon} />
                <div>{coin.name}</div>
                <div>${coin.price.toFixed(2)}</div>
                <div
                  className={
                    coin.priceChange1d > 0 ? "pricePlus" : "priceMinus"
                  }
                >
                  {coin.priceChange1d}%
                </div>
              </div>
              <CryptoExtra
                rank={coin.rank}
                symbol={coin.symbol}
                vol={coin.volume}
                cap={coin.marketCap}
                arr={listOfCoins[index].open}
                link={coin.websiteUrl}
              />
            </div>
          );
        })}
      </div>
      {/* {
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      }
      <td>{price === "0.00" ?
        <h2> Wähle ein Währung aus </h2>
        :<h2>{`$${price}`}</h2>
      }
      </td>         */}
    </div>
  );
};
export default Crypto;
