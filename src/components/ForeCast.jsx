import PropTypes from "prop-types";

const ForeCast = ({ title, data, units }) => {
  const formatTemperature = (temp) => {
    if (units === "imperial") {
      return `${((temp * 9) / 5 + 32).toFixed()}°F`;
    } else {
      return `${temp.toFixed()}°C`;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{d.title}</p>
            <img src={d.icon} alt="weather icon" className="w-12 my-1" />
            <p className="font-medium">{formatTemperature(d.temp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ForeCast.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired,
};

export default ForeCast;
