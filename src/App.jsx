import { useEffect, useState, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";
import Inputs from "./components/Inputs";
import TopButtons from "./components/TopButtons";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import ForeCast from "./components/ForeCast";
import getFormattedWeatherData from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CACHE_DURATION = 3600 * 1000; // 1 hour

function App() {
  const [query, setQuery] = useState({ q: "london" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const debouncedGetWeather = useMemo(
    () =>
      debounce(async (searchQuery, units) => {
        const cachedData = JSON.parse(localStorage.getItem("weatherData"));
        const now = Date.now();

        if (
          cachedData &&
          cachedData.query === searchQuery.q &&
          now - cachedData.timestamp < CACHE_DURATION
        ) {
          setWeather(cachedData.data);
        } else {
          try {
            const data = await getFormattedWeatherData({
              ...searchQuery,
              units,
            });
            if (data) {
              setWeather(data);
              localStorage.setItem(
                "weatherData",
                JSON.stringify({
                  query: searchQuery.q,
                  data,
                  timestamp: now,
                })
              );
              if (searchQuery.lat && searchQuery.lon) {
                toast.info(
                  `Weather data for current location (${capitalizeFirstLetter(
                    data.name
                  )}) fetched!`
                );
              } else {
                toast.info(
                  `Weather data for ${capitalizeFirstLetter(
                    searchQuery.q
                  )} fetched!`
                );
              }
            }
          } catch (error) {
            console.error("Failed to fetch weather data:", error);
            toast.error(
              "Failed to fetch weather data. Please try again later."
            );
          }
        }
      }, 1000),
    []
  );

  const getWeather = useCallback(
    (searchQuery) => {
      debouncedGetWeather(searchQuery, units);
    },
    [debouncedGetWeather, units]
  );

  useEffect(() => {
    getWeather(query);
  }, [query, units, getWeather]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-500 to-blue-500";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp > threshold) return "from-cyan-500 to-blue-500";
    else return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <ForeCast
            title="3 hour forecast"
            data={weather.hourly}
            units={units}
          />
          <ForeCast title="daily forecast" data={weather.daily} units={units} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}

export default App;
