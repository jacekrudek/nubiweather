import React, { useEffect, useState } from "react";

interface WeatherForecastProps {
  city: string;
  days: number;
}

interface ForecastDay {
  date_epoch: number;
  temperature: number;
  condition_text: string;
  condition_icon: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city, days }) => {
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);

  const getDayOfWeek = (dateEpoch: number): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateEpoch * 1000);
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/forecast-weather?location=${city}&days=${days}`
        );
        const data = await response.json();

        const formattedData: ForecastDay[] = data.data.forecast.forecastday
          .slice(0, days)
          .map((day: any) => ({
            date_epoch: day.date_epoch,
            temperature: day.day.avgtemp_c,
            condition_text: day.day.condition.text,
            condition_icon: `https:${day.day.condition.icon}`,
          }));

        setForecastData(formattedData);
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }
    };

    fetchWeather();
  }, [city, days]);

  if (forecastData.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="weather-forecast">
      <ul className="forecast-list">
        {forecastData.map((day, index) => (
          <li key={index} className="forecast-item">
            <p className="week-day">{getDayOfWeek(day.date_epoch)}</p>
            <img
              src={day.condition_icon}
              alt={day.condition_text}
              className="forecast-icon"
            />
            <p className="forecast-temp">{day.temperature}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherForecast;
