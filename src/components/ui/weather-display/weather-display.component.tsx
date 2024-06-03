import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

interface WeatherProps {
  lat: number;
  lon: number;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

const WeatherDisplay: React.FC<WeatherProps> = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (!weatherData) return <div>Loading...</div>;

  const { temp, humidity } = weatherData.main;
  const { speed } = weatherData.wind;
  const { main, icon } = weatherData.weather[0];
  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-display p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">Weather Information</h2>
      <img src={weatherIcon} alt={main} />
      <p>Temperature: {temp}°C</p>
      <p>Condition: {main}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {speed} m/s</p>
    </div>
  );
};

WeatherDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default WeatherDisplay;
