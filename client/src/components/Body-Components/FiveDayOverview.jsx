import { WeatherDetailsComponent } from "./WeatherInfoComponents";
import {
  WIND_ICON,
  DROP_ICON,
  VISIBILITY_ICON,
  PRESSURE_ICON,
  UVINDEX_ICON,
  LEFT_ICON,
  RIGHT_ICON,
  DOWN_ICON,
  LIGHT_DOWN_ICON,
  LIGHT_WIND_ICON,
  LIGHT_PRESSURE_ICON,
  LIGHT_VISIBILITY_ICON,
  LIGHT_UVINDEX_ICON,
  LIGHT_DROP_ICON,
  LIGHT_LEFT_ICON,
  LIGHT_RIGHT_ICON,
} from "../../utils/constant";
import {
  fetchHourlyData,
  getDateFromOffset,
  getDateWithoutYear,
  celciusToFahrenheit,
  msTomph,
} from "../../utils/functions";
import { useState, useEffect, useContext } from "react";
import { parseData } from "../../utils/functions";
import { Shimmer } from "../Shimmer";
import { ThemeContext } from "../../App";
import { ThemeCelcius } from "../Body";

const OneDayOverview = ({
  index,
  hasToOpen,
  setHasToOpen,
  data,
  timezone,
  hasClicked,
  setHasClicked,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useContext(ThemeContext);
  const { units, setUnits } = useContext(ThemeCelcius);

  const handleClick = () => {
    setHasClicked(!hasClicked);
    setIsOpen(!isOpen);
    if (isOpen) setHasToOpen(index);
  };

  useEffect(() => {
    if (hasClicked) {
      if (index === hasToOpen) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [hasToOpen]);

  return (
    <div
      onClick={handleClick}
      className={`text-xl flex flex-col items-center overflow-hidden transition-[height] duration-300 w-screen lg:w-lg cursor-pointer ${
        isOpen ? "h-70 flex-col" : hasClicked ? "h-0" : "h-10 sm:h-12 flex-row"
      }`}
    >
      {hasClicked ? (
        <div className="w-full">
          <div className="mt-4 flex justify-around w-full ">
            {data ? (
              <span className="whitespace-nowrap text-lg sm:text-xl">
                {getDateFromOffset(data.dt, timezone)}
              </span>
            ) : (
              <Shimmer width="w-20" height="h-5" />
            )}
          </div>
          <div className="m-4 flex flex-col items-center">
            <div className="flex justify-center items-center">
              <img
                className=" w-15 sm:w-20 "
                src={`https://openweathermap.org/img/wn/${data.weatherStatus.icon}@2x.png`}
                alt=""
              />
              <div>
                <h1 className="text-2xl sm:text-3xl">
                  {units === "metric"
                    ? data.maxTemp + " / " + data.minTemp + "°C"
                    : celciusToFahrenheit(data.maxTemp) +
                      " / " +
                      celciusToFahrenheit(data.minTemp) +
                      "°F"}
                </h1>
                <span className="font-light text-sm sm:text-lg">
                  feels like{" "}
                  {units === "metric"
                    ? Math.round(data.feelsLike) + "°C"
                    : celciusToFahrenheit(data.feelsLike) + "°F"}
                </span>
              </div>
            </div>
            <p className="m-4 whitespace-nowrap text-sm sm:text-xl">
              {data.weatherStatus.main}, {data.weatherStatus.description}
            </p>
          </div>
          <div className="w-full ">
            <div className="flex justify-around w-full text-sm sm:text-xl">
              <WeatherDetailsComponent
                icon={darkMode ? LIGHT_WIND_ICON : WIND_ICON}
                content={
                  units === "metric"
                    ? data.windSpeed + " m/s"
                    : msTomph(data.windSpeed) + " mi/h"
                }
              />
              <WeatherDetailsComponent
                icon={darkMode ? LIGHT_DROP_ICON : DROP_ICON}
                content={`${data.humidity}%`}
              />
            </div>
            <div className="flex justify-evenly w-full text-sm sm:text-xl">
              <WeatherDetailsComponent
                icon={darkMode ? LIGHT_PRESSURE_ICON : PRESSURE_ICON}
                content={`${data.pressure} hpa`}
              />
              <WeatherDetailsComponent
                icon={darkMode ? LIGHT_VISIBILITY_ICON : VISIBILITY_ICON}
                content={data.visibility + " km"}
              />
              <WeatherDetailsComponent
                icon={darkMode ? LIGHT_UVINDEX_ICON : UVINDEX_ICON}
                content="5, strong"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-rows-1 grid-cols-7 sm:grid-cols-10 w-full">
          <div className="row-start-1 row-end-2 col-start-1 col-end-3 sm:col-end-4  flex justify-start items-center ml-5">
            <span className="whitespace-nowrap text-sm sm:text-lg">
              {getDateWithoutYear(data.dt, timezone)}
            </span>
          </div>
          <div className="flex justify-center row-start-1 row-end-2  col-start-3 sm:col-start-4 max-[360px]:col-end-4 col-end-5 sm:col-end-7 max-[360px]:hidden">
            <div className="flex items-center ">
              <img
                className=" w-10 "
                src={`https://openweathermap.org/img/wn/${data.weatherStatus.icon}@2x.png`}
                alt=""
              />
              <h1 className="text-sm sm:text-lg max-[360px]:hidden whitespace-nowrap">
                {units === "metric"
                  ? data.maxTemp + " / " + data.minTemp + "°C"
                  : celciusToFahrenheit(data.maxTemp) +
                    " / " +
                    celciusToFahrenheit(data.minTemp) +
                    "°F"}
              </h1>
            </div>
          </div>
          <div className="text-sm sm:text-lg row-start-1 row-end-2 max-[360px]:col-start-4 col-start-5 col-end-8  sm:col-start-7 sm:col-end-11 flex items-center justify-end mr-5 lg:mr-0 ">
            <p>
              {data.weatherStatus.description.length >= 16
                ? data.weatherStatus.description.slice(0, 13) + "..."
                : data.weatherStatus.description}
            </p>
            <img src={darkMode ? LIGHT_DOWN_ICON : DOWN_ICON} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

const FiveDayOverview = ({ data }) => {
  const [hasToOpen, setHasToOpen] = useState(null);
  const [fiveDayData, setFiveDayData] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);

  const darkMode = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      if (data !== null) {
        const hd = await fetchHourlyData(data.coord.lat, data.coord.lon);
        const fdd = parseData(hd, data.dt);
        setFiveDayData(fdd);
      }
    };

    fetchData();
  }, [data]);

  const prev = () => {
    setHasToOpen(hasToOpen - 1);
  };

  const next = () => {
    setHasToOpen(hasToOpen + 1);
  };

  return (
    <div className="flex items-start w-full relative h-68 sm:h-72">
      <button
        className={`cursor-pointer absolute left-4 top-4 ${
          hasToOpen == 0 || !hasClicked ? "hidden" : ""
        }`}
        onClick={prev}
      >
        <img src={darkMode ? LIGHT_LEFT_ICON : LEFT_ICON} alt="" />
      </button>
      <div className="flex flex-col overflow-hidden justify-around h-full w-full items-center">
        {data == null || fiveDayData == null ? (
          <Shimmer width="w-screen lg:w-129" height="h-68 sm:h-72" />
        ) : (
          [0, 1, 2, 3, 4].map((i) => (
            <OneDayOverview
              key={i}
              index={i}
              hasToOpen={hasToOpen}
              setHasToOpen={setHasToOpen}
              data={fiveDayData[i + 1]}
              timezone={data.timezone}
              hasClicked={hasClicked}
              setHasClicked={setHasClicked}
            />
          ))
        )}
      </div>
      <button
        className={`cursor-pointer absolute right-4 top-4 ${
          hasToOpen == 4 || !hasClicked ? "hidden" : ""
        }`}
        onClick={next}
      >
        <img src={darkMode ? LIGHT_RIGHT_ICON : RIGHT_ICON} alt="" />
      </button>
    </div>
  );
};

export default FiveDayOverview;
