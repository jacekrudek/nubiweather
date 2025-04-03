import { useEffect, useState } from "react";

const WeatherForecast = ({ city, days }) => {
  const [forecastData, setForecastData] = useState([]);

  const getDayOfWeek = (dateEpoch) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateEpoch * 1000); // Convert seconds to milliseconds
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/forecast-weather?location=${city}&days=${days}`
        );
        const data = await response.json();

        const formattedData = data.data.forecast.forecastday.map((day) => ({
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
  }, []);

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
