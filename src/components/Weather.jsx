import React, { useState, useEffect, useRef } from "react";
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
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzeIcon,
    "04n": drizzeIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async (city) => {
    if (!city?.trim()) {
      alert("Please enter a city");
      return;
    }

    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "City not found");
        setWeatherData(null);
        return;
      }

      const iconCode = data.weather[0].icon;
      const icon = allIcons[iconCode] || clearIcon; // Fallback to clear icon if not found

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
      });
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  useEffect(() => {
    search("Edmonton");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Enter city name..." 
          onKeyPress={handleKeyPress}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <div className="weather-icon-container">
            <img src={weatherData.icon} alt={weatherData.description} className="weather-icon" />
            <p className="description">{weatherData.description}</p>
          </div>
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} KM/H</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
