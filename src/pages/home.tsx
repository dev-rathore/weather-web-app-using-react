import React, { useState, useEffect } from 'react';
import WeatherDisplay from '@/components/ui/weather-display/weather-display.component';
import MapDisplay from '@/components/ui/map-display/map-display.component';
import SearchBar from '@/components/ui/search-bar';

const Home: React.FC = () => {
  const [lat, setLat] = useState<number>(51.505);
  const [lon, setLon] = useState<number>(-0.09);
  const [zoom] = useState<number>(13);
  const [searchHistory, setSearchHistory] = useState<Array<{ lat: number, lon: number }>>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSetLatLon = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLon(longitude);
    setSearchHistory([{ lat: latitude, lon: longitude }, ...searchHistory.slice(0, 4)]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const latInput = form.elements.namedItem('lat') as HTMLInputElement;
    const lonInput = form.elements.namedItem('lon') as HTMLInputElement;
    handleSetLatLon(parseFloat(latInput.value), parseFloat(lonInput.value));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather and Map Application</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2 mb-2">
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            name="lon"
            placeholder="Longitude"
            required
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </div>
        <SearchBar setLatLon={handleSetLatLon} />
      </form>
      <MapDisplay lat={lat} lon={lon} zoom={zoom} setLatLon={handleSetLatLon} />
      <WeatherDisplay lat={lat} lon={lon} />
      {searchHistory.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Search History</h2>
          <ul>
            {searchHistory.map((location, index) => (
              <li
                key={index}
                onClick={() => handleSetLatLon(location.lat, location.lon)}
                className="cursor-pointer underline text-blue-500"
              >
                {`Lat: ${location.lat}, Lon: ${location.lon}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
