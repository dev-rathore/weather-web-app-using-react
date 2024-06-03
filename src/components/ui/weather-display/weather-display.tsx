import React from 'react';
import PropTypes from 'prop-types';
import { weatherLocationString } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WeatherProps {
  weather: any;
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
      className="flex cursor-pointer z-200 flex-col items-center py-4 px-6 bg-[#5782B7] shadow-md rounded-lg"
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

WeatherDisplay.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default WeatherDisplay;
