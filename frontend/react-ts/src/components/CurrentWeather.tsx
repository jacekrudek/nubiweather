import React, { useEffect, useState } from "react";

interface CurrentWeatherProps {
  city: string;
}

interface CurrentWeatherData {
  location: {
    city: string;
    country: string;
  };
  current: {
    temperature: number;
    humidity: string;
    cloud_cover: string;
    condition: string;
    condition_icon: string;
  };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<CurrentWeatherData | null>(
    null
  );

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/realtime-weather?location=${city}`
        );
        const data = await response.json();

        const formattedData: CurrentWeatherData = {
          location: {
            city: data.data.location.name,
            country: data.data.location.country,
          },
          current: {
            temperature: data.data.current.temp_c,
            humidity: data.data.current.humidity,
            cloud_cover: data.data.current.cloud,
            condition: data.data.current.condition.text,
            condition_icon: `https:${data.data.current.condition.icon}`,
          },
        };

        setWeatherData(formattedData);
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }
    };

    fetchWeather();
  }, []);

  if (!weatherData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="current-weather">
      <div className="name-area">
        <div className="city-area">
          <h1 className="city-name">{weatherData.location.city}</h1>
          <img
            src={weatherData.current.condition_icon}
            alt={weatherData.current.condition}
            className="weather-icon"
          />
        </div>
        <h1 className="country-name">{weatherData.location.country}</h1>
      </div>
      <div className="weather-data-area">
        <ul className="weather-data-list">
          <li>🌡️ Temperature:</li>
          <li>💧 Humidity:</li>
          <li>☁️ Cloud cover:</li>
        </ul>
        <ul className="weather-data-list">
          <li>{weatherData.current.temperature}°C</li>
          <li>{weatherData.current.humidity}%</li>
          <li>{weatherData.current.cloud_cover}%</li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeather;
