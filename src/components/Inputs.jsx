import PropTypes from "prop-types";
import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search By City...."
          className="text-gray-600 text-xl font-light p-2 shadow-xl w-full capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          onClick={handleSearchClick}
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
        <BiCurrentLocation
          onClick={handleLocationClick}
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>

        <p className="text-2xl font-medium mx-1">|</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

Inputs.propTypes = {
  setQuery: PropTypes.func.isRequired,
  setUnits: PropTypes.func.isRequired,
};

export default Inputs;
