import { WeatherData } from "@/contexts/weather.provider";
import { memo, useState } from "react";
import WeatherDataModal from "./weather-data-modal";
import { weatherLocationString } from "@/lib/utils";

import { motion } from "framer-motion";

type Props = {
  weatherDataList: WeatherData[];
};

const WeatherDataList: React.FC<Props> = ({ weatherDataList }) => {
  const [modalWeatherData, setModalWeatherData] = useState<WeatherData | null>(null);

  const handleModalDataChange = (weatherData: WeatherData) => {
    setModalWeatherData(weatherData);
  }

  const handleModalClose = () => {
    setModalWeatherData(null);
  }

  return (
    <motion.div
      className="overflow-y-auto grow rounded-lg py-5 px-5 border-2 border-accent-200 bg-light dark:bg-accent-200"
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      variants={{
        hidden: { translateX: -150 },
        visible: { translateX: 0 },
      }}
    >
      {modalWeatherData && <WeatherDataModal weatherData={modalWeatherData} onClose={handleModalClose} />}
      {weatherDataList?.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center text-accent-200 dark:text-white">Weather Search History</h2>
          <div className='max-h-[48vh] flex flex-col overflow-y-auto'>
            {weatherDataList?.reverse().map((weather, index) => (
              <div
                key={index}
                onClick={() => handleModalDataChange(weather)}
                className="cursor-pointer flex gap-4 items-center px-4 py-2 rounded-lg text-accent-200 hover:text-light dark:text-white hover:bg-accent-200 dark:hover:bg-accent-100 transition-colors"
              >
                <img
                  width={40}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
                <p className="text-base font-semibold">
                  {weatherLocationString({
                    name: weather.name,
                    country: weather.country,
                    lat: weather.lat!,
                    lon: weather.lon!,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default memo(WeatherDataList);
