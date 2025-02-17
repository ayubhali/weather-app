import React from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import drizzeIcon from "../assets/drizzle.png";

const Weather = () => {
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <img src={searchIcon} alt="search" />
      </div>
      <img src={clearIcon} alt="clear" className="weather-icon" />
      <p className="temperature">16°C</p>
      <p className="location">Edmonton</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="humidity" />
          <div>
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windIcon} alt="wind" />
          <div>
            <p>9.6 KM/H</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
