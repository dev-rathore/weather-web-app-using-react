import React from 'react';
import { weatherLocationString } from '@/lib/utils';
import { motion } from 'framer-motion';
import { WeatherData } from '@/contexts/weather.provider';

interface WeatherProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherProps> = ({
  weather,
}) => {
  if (!weather?.main) {
    return null;
  }

  const { temp, humidity } = weather?.main;
  const { speed } = weather?.wind;
  const { main, icon } = weather?.weather[0];
  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <motion.div
      className="flex cursor-pointer z-200 flex-col items-center py-4 px-6 border-2 border-accent-200 bg-light dark:bg-accent-100 shadow-md rounded-lg"
      whileHover={{
        rotateZ: -5,
        transition: { duration: 0.3 },
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      variants={{
        hidden: { translateX: -200 },
        visible: { translateX: 0 },
      }}
    >
      <h2 className="text-xl font-bold">
        {weatherLocationString({
          name: weather?.name,
          country: weather?.country,
          lat: weather?.lat,
          lon: weather?.lon,
        })}
      </h2>
      <img src={weatherIcon} alt={main} />
      <div className='text-base font-semibold'>
        <p>Temperature: {temp}°C</p>
        <p>Condition: {main}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {speed} m/s</p>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;
