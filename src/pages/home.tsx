import React, { useState } from 'react';
import WeatherDisplay from '@/components/ui/weather-display/weather-display';
import MapDisplay from '@/components/ui/map-display/map-display';
import SearchBar from '@/components/ui/search-bar';
import { useWeatherContext } from '@/contexts/weather.provider';
import WeatherDataList from '@/components/ui/weather-data-list/weather-data-list';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { useThemeContext } from '@/contexts/theme.provider';
import { Switch } from '@/components/ui/switch';

const Home: React.FC = () => {
  const [zoom] = useState<number>(13);
  const [lat, setLat] = useState<number>(51.505);
  const [lon, setLon] = useState<number>(-0.09);
  const {
    weatherDataList,
    currentLocationWeatherData,
    saveWeatherData,
  } = useWeatherContext();
  const {
    isDarkMode,
    onThemeModeChange,
  } = useThemeContext();

  const onLatLngChange = async (latitude: number, longitude: number) => {
    setLat(latitude);
    setLon(longitude);
    await saveWeatherData(latitude, longitude);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const latInput = form.elements.namedItem('lat') as HTMLInputElement;
    const lonInput = form.elements.namedItem('lon') as HTMLInputElement;
    onLatLngChange(parseFloat(latInput.value), parseFloat(lonInput.value));
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-6 flex flex-col gap-4 min-h-screen"
      initial={"hidden"}
      animate={"visible"}
    >
      <div className='relative'>
        <motion.h1
          className="text-3xl font-bold text-center mb-4"
          variants={{
            hidden: { translateY: -100 },
            visible: { translateY: 0 },
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          Weather Web App
        </motion.h1>
        <div className='absolute top-3 right-0'>
          <Switch checked={isDarkMode} onCheckedChange={onThemeModeChange} />
        </div>
      </div>
      <div className='grow flex flex-col md:flex-row gap-4'>
        <div
          className='flex flex-col sm:flex-row md:flex-col gap-4 order-2 md:order-1'
        >
          {
            currentLocationWeatherData &&
              <WeatherDisplay
                weather={currentLocationWeatherData}
              />
          }
          <WeatherDataList
            weatherDataList={weatherDataList}
          />
        </div>
        <div className='flex flex-col grow gap-4 order-1 md:order-2'>
          <form onSubmit={handleSubmit}>
            <motion.div
              className="flex space-x-2 mb-4"
              variants={{
                hidden: { translateX: 200 },
                visible: { translateX: 0 },
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <Input
                type="number"
                name="lat"
                placeholder="Latitude"
                required
              />
              <Input
                type="number"
                name="lon"
                placeholder="Longitude"
                required
              />
              <Button type="submit" size="lg">SUBMIT</Button>
            </motion.div>
            <SearchBar setLatLon={onLatLngChange} />
          </form>
          {lat && lon && <MapDisplay lat={lat} lon={lon} zoom={zoom} setLatLon={onLatLngChange} />}
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
