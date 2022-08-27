import React, { useState } from "react";
import "../style/Weather.css";
import sunny from "../../assets/sunny.jpg";
import cloudy from "../../assets/cloudy.jpg";

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
          <p>Welcome! Please enter the city to see the weather of.</p>
        </div>
      ) : (
        <div>
          <p>{weatherData.name}</p>
          <p>{Math.round(weatherData.main.temp)} °C</p>
          <img src={loadIcon(weatherData.clouds.all)} />
        </div>
      )}
    </div>
  );
};
export default Weather;
