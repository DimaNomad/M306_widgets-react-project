import React, { useState } from "react";
import "../style/Weather.css";
import "../../App.css";
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.png";

//TODO insert highest and lowest temp data. maybe add discription of weather from icon data?
//TODO style: rearrange all data and icon to fit the size of the widget div. colors and font are good atm.

const Weather = () => {
  const apiKey = "03a54ffa1ab7576cedf7e4a660a559fe";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  const loadIcon = (data) => {
    if (data < 50) {
      return sunny;
    } else if (data > 50) {
      return cloudy;
    }
  };

  return (
    <div className="container glass">
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p style={{ paddingTop: "20px" }}>
            Welcome! Please enter the city to see the weather of.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="cityName">{weatherData.name}</p>
          <img className="icon" src={loadIcon(weatherData.clouds.all)} />
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
};
export default Weather;
