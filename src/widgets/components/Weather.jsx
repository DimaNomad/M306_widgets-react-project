import React, { useState } from "react";
import "../style/Weather.css";
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.png";

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
    <div>
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
          <p className="temp">
            {Math.round(((weatherData.main.temp - 32) * 5) / 9)}°C
          </p>
        </div>
      )}
    </div>
  );
};
export default Weather;
