import React from "react";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";
import "./styles/app.css";

function App() {
  const gliwiceCity = "Gliwice";
  const hamburgCity = "Hamburg";

  return (
    <div className="weather-area">
      <div className="weather-container">
        <CurrentWeather city={gliwiceCity} />
        <CurrentWeather city={hamburgCity} />
      </div>
      <div className="weather-container">
        <WeatherForecast city={gliwiceCity} days={3} />
        <WeatherForecast city={hamburgCity} days={3} />
      </div>
    </div>
  );
}

export default App;
