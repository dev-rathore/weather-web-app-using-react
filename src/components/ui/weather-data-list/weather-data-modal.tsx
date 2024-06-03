import { WeatherData } from "@/contexts/weather.provider";
import WeatherDisplay from "../weather-display/weather-display";
import { Button } from "../button";
import { XIcon } from "lucide-react";

type Props = {
  weatherData: WeatherData;
  onClose: () => void;
};

const WeatherDataModal: React.FC<Props> = ({
  weatherData,
  onClose,
}) => {
  return (
    <div className="fixed z-10000 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-[80vw] lg:w-1/3 h-[60vh] bg-[#2A5792] relative flex items-center rounded-lg justify-center">
        <Button onClick={onClose} className="absolute bg-transparent right-4 top-4 text-white" size="icon">
          <XIcon />
        </Button>
        <WeatherDisplay weather={weatherData} />
      </div>
    </div>
  );
};

export default WeatherDataModal;
