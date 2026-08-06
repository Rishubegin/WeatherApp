import { Shimmer, WeatherDetailsShimmer } from "../Shimmer";
import {
  WIND_ICON,
  DROP_ICON,
  VISIBILITY_ICON,
  PRESSURE_ICON,
  UVINDEX_ICON,
  TEMPRATURE_ICON,
  SUNRISE_ICON,
  SUNSET_ICON,
  LOCATION_ICON,
  LIGHT_LOCATION_ICON,
  LIGHT_WIND_ICON,
  LIGHT_DROP_ICON,
  LIGHT_PRESSURE_ICON,
  LIGHT_VISIBILITY_ICON,
  LIGHT_TEMPRATURE_ICON,
  LIGHT_UVINDEX_ICON,
  LIGHT_SUNSET_ICON,
  LIGHT_SUNRISE_ICON,
} from "../../utils/constant";
import {
  celciusToFahrenheit,
  getCountryName,
  getTimeFromOffset,
  iconLink,
  msTomph,
} from "../../utils/functions";

import { ThemeContext } from "../../App";
import { useContext } from "react";
import { ThemeCelcius } from "../Body";

export const LocationAndTime = ({ data }) => {
  const darkMode = useContext(ThemeContext);

  return (
    <div className="flex w-full justify-between text-lg sm:text-xl lg:text-2xl pt-1 md:pt-3 sm:pr-0 lg:pr-3">
      {data ? (
        <div className="flex justify-start items-start">
          <img
            src={darkMode ? LIGHT_LOCATION_ICON : LOCATION_ICON}
            className="w-6 sm:w-8 hidden sm:inline"
            alt=""
          />
          <div className="">
            <h2 className="flex text-pretty" id="city-name">
              {data.name}, {getCountryName(data.sys.country)}
            </h2>
          </div>
        </div>
      ) : (
        <Shimmer width="w-40 sm:w-60" height="h-5 sm:h-8" />
      )}

      <div>
        {data ? (
          <span className="whitespace-nowrap">
            {getTimeFromOffset(data.dt, data.timezone)}
          </span>
        ) : (
          <Shimmer width="w-20 sm:w-30" height="h-5 sm:h-8" />
        )}
      </div>
    </div>
  );
};

export const WeatherStatus = ({ data }) => {
  const { units, setUnits } = useContext(ThemeCelcius);

  return (
    <div className="flex flex-col items-center m-4 sm:mb-10 w-fit">
      <div className="flex" id="weather-condition ">
        {data ? (
          <div className="pl-4 pr-4">
            <img
              src={iconLink(data.weather[0].icon)}
              alt="WeatherIcon"
              className="w-20"
            />
          </div>
        ) : (
          <Shimmer width="w-10 m-4" height="h-10" />
        )}

        {data ? (
          <div className="pr-5 pb-5">
            <h1 className=" text-3xl sm:text-4xl">
              {units === "metric"
                ? Math.ceil(data.main.temp) + "°C"
                : celciusToFahrenheit(data.main.temp) + "°F"}
            </h1>
            <p className="text-l sm:text-xl font-light whitespace-nowrap">
              feels like{" "}
              {units === "metric"
                ? Math.ceil(data.main.feels_like) + "°C"
                : celciusToFahrenheit(data.main.feels_like) + "°F"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <Shimmer height="h-8 sm:h-10" width="w-12 sm:w-15" />
            <Shimmer height="h-5" width="w-20" />
          </div>
        )}
      </div>
      <div>
        {data ? (
          <h2 className=" text-l sm:text-xl">
            {data.weather[0].main}, {data.weather[0].description}
          </h2>
        ) : (
          <Shimmer width="w-30 sm:w-40" height="h-5 sm:h-8" />
        )}
      </div>
    </div>
  );
};

export const WeatherDetailsComponent = ({ icon, content, rotate }) => {
  return (
    <div className="" id="weather-details">
      <img
        src={icon}
        alt=""
        className={`w-6 sm:w-8 mb-1 mr-2 inline ${
          rotate ? `rotate-[${rotate}deg]` : ""
        }`}
      />
      <span className="text-l sm:text-xl font-light">{content}</span>
    </div>
  );
};

export const WeatherDetails = ({ data }) => {
  const darkMode = useContext(ThemeContext);
  const { units, setUnits } = useContext(ThemeCelcius);

  return (
    <>
      {data ? (
        <div
          className="flex justify-around md:justify-between lg:justify-around m-4"
          id="weather-details"
        >
          <div>
            <WeatherDetailsComponent
              icon={darkMode ? LIGHT_WIND_ICON : WIND_ICON}
              content={
                units === "metric"
                  ? data.wind.speed + " km/h"
                  : msTomph(data.wind.speed) + " mi/h"
              }
              rotate={45}
            />
            <WeatherDetailsComponent
              icon={darkMode ? LIGHT_DROP_ICON : DROP_ICON}
              content={`${data.main.humidity}%`}
            />

            <WeatherDetailsComponent
              icon={darkMode ? LIGHT_PRESSURE_ICON : PRESSURE_ICON}
              content={`${data.main.pressure} hPa`}
            />
          </div>

          <div>
            <WeatherDetailsComponent
              icon={darkMode ? LIGHT_VISIBILITY_ICON : VISIBILITY_ICON}
              content={`${data.visibility / 1000}km`}
            />
            <WeatherDetailsComponent
              icon={darkMode ? LIGHT_UVINDEX_ICON : UVINDEX_ICON}
              content={"5, strong"}
            />
            <WeatherDetailsComponent
              icon={darkMode ? LIGHT_TEMPRATURE_ICON : TEMPRATURE_ICON}
              content={"45/26 °C"}
            />
          </div>
        </div>
      ) : (
        <WeatherDetailsShimmer />
      )}
    </>
  );
};

export const Aqi = ({ aqi, aqiData }) => {
  return (
    <div className=" h-fit sm:pb-6 w-fit" id="aqi">
      <p className=" text-xl sm:text-2xl font-light pl-1">AQI</p>
      <div className="flex items-center">
        {aqi ? (
          <>
            <h1 className="text-2xl sm:text-4xl inline leading-0 sm:leading-none">
              {aqi}
            </h1>
            <div className="pl-1 text-xl sm:text-2xl">
              {aqi > 0 && aqi <= 50 ? (
                <span>Good</span>
              ) : aqi > 50 && aqi <= 100 ? (
                <span>Moderate</span>
              ) : aqi > 100 && aqi <= 150 ? (
                <>
                  <span className="leading-0 text-xl sm:text-2xl">
                    Unhealthy
                  </span>
                  <p className=" leading-1 text-xs whitespace-nowrap ">
                    for sensitive Groups
                  </p>
                </>
              ) : aqi > 150 && aqi <= 200 ? (
                <span>Unhealthy</span>
              ) : aqi > 200 && aqi <= 300 ? (
                <div className="flex flex-col justify-center">
                  <span className="text-xs md:text-sm leading-1">Very</span>
                  <p className="text-lg md:text-xl leading-6"> Unhealthy</p>
                </div>
              ) : (
                <p>Hazardous</p>
              )}
            </div>
          </>
        ) : (
          <Shimmer width="w-40 sm:w-50" height="h-8 sm:h-10" />
        )}
      </div>

      <h4 className="text-l sm:text-xl font-light inline">
        PM2.5{" "}
        <span className="font-normal">
          {aqiData ? (
            aqiData.list[0].components.pm2_5
          ) : (
            <Shimmer width="w-20 sm:w-30" height="h-5 sm:h-8" />
          )}
        </span>
      </h4>
      <h4 className="text-l sm:text-xl font-light">
        PM10
        <span className="font-normal inline">
          {" "}
          {aqiData ? (
            aqiData.list[0].components.pm10
          ) : (
            <Shimmer width="w-20 sm:w-30" height="h-5 sm:h-8" />
          )}
        </span>
      </h4>
    </div>
  );
};

export const SunriseSunset = ({ data }) => {
  const darkMode = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center flex-col text-xl sm:text-2xl font-light sm:m-4 pr-5 sm:pr-0 whitespace-nowrap">
      <div className="">
        <img
          src={darkMode ? LIGHT_SUNRISE_ICON : SUNRISE_ICON}
          className="inline w-10 sm:w-15"
          alt="sunrise"
        />
        {data ? (
          <span>{getTimeFromOffset(data.sys.sunrise, data.timezone)}</span>
        ) : (
          <Shimmer width="w-20 sm:w-30" height="h-5 sm:h-8" />
        )}
      </div>
      <div>
        <img
          src={darkMode ? LIGHT_SUNSET_ICON : SUNSET_ICON}
          className="inline w-10 sm:w-15"
          alt="sunset"
        />
        {data ? (
          <span>{getTimeFromOffset(data.sys.sunset, data.timezone)}</span>
        ) : (
          <Shimmer width="w-20 sm:w-30" height="h-5 sm:h-8" />
        )}
      </div>
    </div>
  );
};
