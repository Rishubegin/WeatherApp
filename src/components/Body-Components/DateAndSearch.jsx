import {
  fetchLatLon,
  fetchWeatherdata,
  getCountryName,
  getDateFromOffset,
  getExactLocation,
} from "../../utils/functions";

import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import {
  SEARCH_ICON,
  CLOSE_ICON,
  LIGHT_SEARCH_ICON,
} from "../../utils/constant";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { Shimmer } from "../Shimmer";
import { ThemeCelcius } from "../Body";

countries.registerLocale(en);

const DateAndSearch = ({ sendData }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [data, setData] = useState(null);
  const [isHide, setIsHide] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [location, setLocation] = useState({ lat: null, lon: null });

  // const [latitude, setLatitude] = useState(26.8381);
  // const [longitude, setLongitude] = useState(80.9346001);

  const darkMode = useContext(ThemeContext);
  const { units, setUnits } = useContext(ThemeCelcius);

  const split = () => {
    const info = searchText.split(", ").map((part) => part.trim());
    let countryCode = countries.getAlpha2Code(info[1], "en");
    return [info[0], countryCode];
  };

  const searchQuery = async (lat, lon, units) => {
    const info = await fetchWeatherdata(lat, lon, units);
    setData(info);
    sendData(info);
  };

  const handleFetchLatLon = async (cityName, countryCode) => {
    setSearchResult(null);
    const info = await fetchLatLon(cityName, countryCode);
    if (info === null) {
      setSearchText("City Not Found!");
    }
    setSearchResult(info);
  };

  const handleQueryClick = (lat, lon, units) => {
    setData(null);
    sendData(null);
    searchQuery(lat, lon, units);
    setIsHide(true);
    setSearchText("");
  };

  const [count, setCount] = useState(0);
  useEffect(() => {
    async () => {
      const coord = await getExactLocation();
      setLocation({
        lat: coord[0],
        lon: coord[1],
      });
    };
    if (location.lat === null || location.lon === null) {
      searchQuery(26.8381, 80.9346001, units);
    } else {
      searchQuery(location.lat, location.lon, units);
    }
    setSearchText("");
  }, [count]);

  useEffect(() => {
    if (isCelsius) setUnits("metric");
    else setUnits("imperial");
  }, [isCelsius]);

  // useEffect(() => {
  //   handleQueryClick(latitude, longitude, units);
  // }, [units]);

  const toggle = () => setIsCelsius(!isCelsius);

  return (
    <div
      className="grid grid-cols-2 grid-rows-2 sm:flex w-full sm:h-[100px] justify-between items-center"
      id="date-and-search"
    >
      <div className="row-start-1 text-l sm:text-2xl pl-5" id="date">
        {data === null ? (
          <Shimmer height="w-40 sm:w-60" width=" h-5 sm:h-8" />
        ) : (
          <span className="animaiton-pulse">
            {getDateFromOffset(data.dt, data.timezone)}
          </span>
        )}
      </div>
      <div className="row-start-2 col-start-1 col-end-3 flex flex-col sm:w-1/2 m-3 relative">
        <div className="flex w-full">
          <input
            placeholder="CityName"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onFocus={() => {
              setIsHide(true);
            }}
            className="w-full border-2 outline-none border-none bg-gray-300 text-l sm:text-xl h-10 sm:h-13 p-3 rounded-l-md dark:bg-gray-700"
            id="input-city"
          />
          <button
            onClick={() => {
              const addr = split();
              handleFetchLatLon(addr[0], addr[1]);
              setIsHide(false);
            }}
            className="transition duration-200 ease-out cursor-pointer bg-gray-300 h-10 sm:h-13 rounded-r-md pr-2 pl-2 dark:bg-gray-700"
          >
            <img
              src={darkMode ? LIGHT_SEARCH_ICON : SEARCH_ICON}
              alt="search-icon"
              className="w-8 hover:scale-125 transition-all duration-300"
            />
          </button>
        </div>
        <div
          className={`bg-gray-300 p-2 max-h-50 h-fit w-full flex flex-col justify-around absolute top-12 sm:top-15 rounded-md z-10 text-md sm:text-xl overflow-scroll dark:bg-gray-700 ${
            searchResult ? (isHide ? "hidden" : "") : "hidden"
          }`}
        >
          <button
            className="absolute right-2 top-1"
            onClick={() => {
              setIsHide(true);
            }}
          >
            <img
              src={CLOSE_ICON}
              alt="close"
              className="w-6 sm:w-8 cursor-pointer"
            />
          </button>
          {searchResult
            ? searchResult.map((query, index) => (
                <div
                  className="hover:cursor-pointer hover:bg-gray-400 h-12 flex items-center dark:hover:bg-gray-900"
                  key={index}
                  onClick={() => {
                    // setLatitude(query.lat);
                    // setLongitude(query.lon);
                    handleQueryClick(query.lat, query.lon, units);
                  }}
                >
                  {query.name}, {query.state}, {getCountryName(query.country)}
                </div>
              ))
            : "Searching"}
        </div>
      </div>

      <div className="justify-end row-start-1 col-start-2 flex sm:items-center space-x-3 mr-3 ">
        <span className="font-medium">{isCelsius ? "°C" : "°F"}</span>
        <button
          onClick={toggle}
          className={`w-12 h-6 sm:w-16 sm:h-8 flex items-center rounded-full p-1 transition-colors duration-300 bg-gray-300 dark:bg-gray-700`}
        >
          <div
            className={`bg-white w-4 h-4 sm:w-6 sm:h-6 rounded-full shadow-md transform transition-transform duration-300 dark:bg-black ${
              isCelsius ? "translate-x-0" : "translate-x-6 sm:translate-x-8"
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default DateAndSearch;
