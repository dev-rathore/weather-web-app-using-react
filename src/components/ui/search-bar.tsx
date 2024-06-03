import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-google-autocomplete';
import { SearchIcon } from 'lucide-react';
import { inputStyles } from './input';

interface SearchBarProps {
  setLatLon: (lat: number, lon: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setLatLon }) => {
  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry) {
      const lat = place.geometry.location?.lat();
      const lng = place.geometry.location?.lng();
      if (lat && lng) {
        setLatLon(lat, lng);
      }
    }
  };

  const handleSearchClick = () => {
    // const inputElement = document.querySelector('.react-google-autocomplete input') as HTMLInputElement;
    // if (inputElement && inputElement.value) {
    //   console.log(inputElement.value);
    // }
  };

  return (
    <div className="relative flex items-center">
      <Autocomplete
        apiKey={process.env.GOOGLE_MAPS_API_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={{ types: ['(regions)'] }}
        className={inputStyles}
      />
      <button onClick={handleSearchClick} className="text-white absolute right-4">
        <SearchIcon />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  setLatLon: PropTypes.func.isRequired,
};

export default memo(SearchBar);
