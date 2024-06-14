import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const [temperature, setTemperature] = useState(temp); // State to manage temperature
  const [temperatureUnit, setTemperatureUnit] = useState("°C"); // State to manage temperature unit display

  useEffect(() => {
    // Update temperature and unit display based on units prop change
    if (units === "metric") {
      setTemperatureUnit("°C");
      setTemperature(temp);
    } else if (units === "imperial") {
      setTemperatureUnit("°F");
      setTemperature((temp * 9) / 5 + 32); // Convert Celsius to Fahrenheit
    }
  }, [units, temp]);

  const windSpeedUnit = units === "metric" ? "km/h" : "m/s";

  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}${temperatureUnit}`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed} ${windSpeedUnit}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdOutlineKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}${temperatureUnit}`,
    },
    {
      id: 4,
      Icon: MdOutlineKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}${temperatureUnit}`,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-500">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img src={icon} alt="weather icon" className="w-20" />
        <p className="text-5xl">{`${temperature.toFixed()}${temperatureUnit}`}</p>
        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={18} className="text-lg mr-2" />
              {`${title}: `}
              <span className="font-medium ml-1">{`${value}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={30} />
            <p className="font-light ml-1">
              {`${title}: `}
              <span className="font-medium ml-1">{`${value}`}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

TempAndDetails.propTypes = {
  weather: PropTypes.shape({
    details: PropTypes.string,
    icon: PropTypes.string,
    temp: PropTypes.number,
    temp_min: PropTypes.number,
    temp_max: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    speed: PropTypes.number,
    humidity: PropTypes.number,
    feels_like: PropTypes.number,
  }).isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired,
};

export default TempAndDetails;
