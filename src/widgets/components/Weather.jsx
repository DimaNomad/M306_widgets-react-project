import React, { useEffect, useState } from "react";
import "../style/Weather.css";
import "../../App.css";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";

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
  const icons = [
    {
      id: "sunny",
      icon: <TiWeatherSunny />,
    },
    {
      id: "partlySunny",
      icon: <TiWeatherPartlySunny />,
    },
    {
      id: "cloudy",
      icon: <TiWeatherCloudy />,
    },
    {
      id: "shower",
      icon: <TiWeatherShower />,
    },
    {
      id: "downpour",
      icon: <TiWeatherDownpour />,
    },
    {
      id: "stormy",
      icon: <TiWeatherStormy />,
    },
  ];

  const loadIcons = (data) => {
    console.log(data);
    switch (data) {
      case data < 15:
        return icons[0].icon;
      case data > 15 && data < 30:
        return icons[1].icon;
      case data > 30 && data < 45:
        return icons[2].icon;
      case data > 45 && data < 60:
        return icons[3].icon;
      case data > 60 && data < 75:
        return icons[4].icon;
      case data > 75:
        return icons[5].icon;
      default:
        return null;
    }
  };

  return (
    <div className="container glass">
      <input
        className="input"
        placeholder="Enter city..."
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
          <div className="iconDiv">
            {weatherData.clouds.all < 15 ? <TiWeatherSunny size={60} /> : null}
            {weatherData.clouds.all >= 15 && weatherData.clouds.all < 30 ? (
              <TiWeatherPartlySunny size={60} />
            ) : null}
            {weatherData.clouds.all >= 30 && weatherData.clouds.all < 45 ? (
              <TiWeatherCloudy size={60} />
            ) : null}
            {weatherData.clouds.all >= 45 && weatherData.clouds.all < 60 ? (
              <TiWeatherShower size={60} />
            ) : null}
            {weatherData.clouds.all >= 60 && weatherData.clouds.all < 75 ? (
              <TiWeatherDownpour size={60} />
            ) : null}
            {weatherData.clouds.all >= 75 ? (
              <TiWeatherStormy size={60} />
            ) : null}
          </div>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <div className="tempHL">
            <p className="H">H:{weatherData.main.temp_max}°C</p>
            <p className="H">L:{weatherData.main.temp_min}°C</p>
          </div>
          <hr></hr>
          <p className="H">Humidity: {weatherData.main.humidity}%</p>
          <hr></hr>
          <p className="H">Wind: {weatherData.wind.speed}km/h</p>
          <hr></hr>
          <p className="H">Pressure: {weatherData.main.pressure}hPa</p>
        </div>
      )}
    </div>
  );
};
export default Weather;
