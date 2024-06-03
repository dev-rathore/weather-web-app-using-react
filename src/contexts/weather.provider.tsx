import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface WeatherData {
  lat?: number;
  lon?: number;
  name: string;
  country: string;
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

type WeatherContextType = {
  saveWeatherData: (lat: number, lon: number) => Promise<void>;
  weatherDataList: WeatherData[];
  setCurrentLocationWeatherData?: any;
  currentLocationWeatherData?: any;
};

const INITIAL_DUMMY_DATA = {
  "lat": 51.505,
  "lon": -0.09,
  "main": {
      "temp": 20.01,
      "feels_like": 19.76,
      "temp_min": 18.92,
      "temp_max": 21.38,
      "pressure": 1020,
      "humidity": 65
  },
  "name": "City of London",
  "country": "GB",
  "wind": {
      "speed": 3.6,
      "deg": 300
  },
  "weather": [
      {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }
  ]
};

const WeatherContext = createContext<WeatherContextType>(null!);

export const useWeatherContext = (): WeatherContextType => useContext(WeatherContext);

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>(
    JSON.parse(localStorage.getItem('weatherDataList')!)
  );
  const [currentLocationWeatherData, setCurrentLocationWeatherData] = useState<any>(INITIAL_DUMMY_DATA);

  const initializeWeatherData = useCallback(async () => {
    const data = JSON.parse(localStorage.getItem('weatherDataList')!);

    if (data) {
      setWeatherDataList(data);
    }
  }, []);

  useEffect(() => {
    initializeWeatherData();
  }, []);

  // Fetch weather data from local storage by lat lng
  const saveWeatherData = async (lat: number, lon: number): Promise<void> => {
    console.log(weatherDataList);
    const weatherData = weatherDataList.find((data) => data.lat === lat && data.lon === lon);

    if (weatherData) {
      setCurrentLocationWeatherData(weatherData);
      return;
    }

    const newWeatherData = await fetchWeatherData(lat, lon);

    if (newWeatherData) {
      setCurrentLocationWeatherData(newWeatherData);
      const successString = (newWeatherData.name && newWeatherData.country) ? `${newWeatherData.name}, ${newWeatherData.country}` : `Lat: ${newWeatherData.lat}, Lng: ${newWeatherData.lon}`;
      toast.success(`New Weather Report found for location - ${successString}`);
      const list = JSON.parse(localStorage.getItem('weatherDataList')!);
      const newWeatherDataList = [...list, newWeatherData];
      localStorage.setItem('weatherDataList', JSON.stringify(newWeatherDataList));
      setWeatherDataList(newWeatherDataList);
    } else {
      toast.error('No weather data found for the given location');
    }
  }

  const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric'
        }
      });

      const data = response.data;

      return {
        lat,
        lon,
        name: data.name,
        country: data.sys.country,
        main: data.main,
        wind: data.wind,
        weather: data.weather,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        saveWeatherData,
        weatherDataList,
        setCurrentLocationWeatherData,
        currentLocationWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
