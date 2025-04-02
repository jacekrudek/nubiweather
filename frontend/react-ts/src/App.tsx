import React, { useEffect, useState } from "react";

import "./styles/app.css";

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    condition_icon: string;
  };
}
//   tomorrow: {
//     temperature: number;
//     condition: string;
//   };
//   twodays: {
//     temperature: number;
//     condition: string;
//   };
//   threedays: {
//     temperature: number;
//     condition: string;
//   };
// }

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const gliwiceCity = "Gliwice";
  const hamburgCity = "Hamburg";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responseGliwice = await fetch(
          `http://localhost:5000/realtime-weather?location=${gliwiceCity}`
        );
        const dataGliwice = await responseGliwice.json();

        const responseHamburg = await fetch(
          `http://localhost:5000/realtime-weather?location=${hamburgCity}`
        );
        const dataHamburg = await responseHamburg.json();

        const gliwiceWeather = {
          location: dataGliwice.data.location.name,
          current: {
            temperature: dataGliwice.data.current.temp_c,
            condition: dataGliwice.data.current.condition.text,
            condition_icon: `https:${dataGliwice.data.current.condition.icon}`,
          },
        };

        const hamburgWeather = {
          location: dataHamburg.data.location.name,
          current: {
            temperature: dataHamburg.data.current.temp_c,
            condition: dataHamburg.data.current.condition.text,
            condition_icon: `https:${dataHamburg.data.current.condition.icon}`,
          },
        };

        console.log(dataHamburg);
        console.log(hamburgWeather.current.condition_icon);

        setWeatherData([gliwiceWeather, hamburgWeather]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-area">
      <div className="weather-container">
        {weatherData.map((cityWeather, index) => (
          <div key={index} className="city-container">
            <div className="name-area">
              <h1 className="city-name">{cityWeather.location}</h1>
              <img
                src={cityWeather.current.condition_icon}
                alt={cityWeather.current.condition}
                className="weather-icon"
              />
            </div>
            <div className="weather-data-area">
              <ul className="weather-data-list">
                <li>🌡️ Temperature:</li>
                <li>🌧️ Conditions:</li>
              </ul>
              <ul className="weather-data-list nopointer">
                <li>{cityWeather.current.temperature}°C</li>
                <li>{cityWeather.current.condition}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
