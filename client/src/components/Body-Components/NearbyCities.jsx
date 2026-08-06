import { fetchWeatherCities, celciusToFahrenheit } from "../../utils/functions";
import { useState, useEffect, useContext } from "react";
import { Shimmer, ShimmerCity } from "../Shimmer";
import { ThemeCelcius } from "../Body";

const CityWeatherStatus = ({ data }) => {
  const { units, setUnits } = useContext(ThemeCelcius);
  return (
    <div className="flex flex-col items-center  w-fit">
      <div className="flex" id="weather-condition ">
        {data ? (
          <div className="">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="WeatherIcon"
              className="w-15"
            />
          </div>
        ) : (
          <Shimmer width="w-10 m-4" height="h-10" />
        )}

        {data ? (
          <div className="">
            <h1 className=" text-2xl sm:text-3xl">
              {units === "metric"
                ? Math.ceil(data.main.temp) + "°C"
                : celciusToFahrenheit(data.main.temp) + "°F"}
            </h1>
            <p className="text-[12px] sm:text-md font-light whitespace-nowrap">
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
          <h2 className=" text-md sm:text-lg">
            {data.weather[0].description.length > 16
              ? data.weather[0].description.slice(0, 13) + "..."
              : data.weather[0].description}
          </h2>
        ) : (
          <Shimmer width="w-30 sm:w-40" height="h-5 sm:h-8" />
        )}
      </div>
    </div>
  );
};

const City = ({ sendData, cityData, setCitiesData }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { units, setUnits } = useContext(ThemeCelcius);
  return (
    <div
      onClick={() => {
        scrollToTop();
        sendData(cityData);
      }}
      className="cursor-pointer rounded-2xl p-2 h-fit w-fit bg-gray-200 transition-colors duration-300 ease-out dark:text-white dark:bg-gray-800"
    >
      <h1 className="text-center text-lg sm:text-xl m-2 flex justify-center">
        {cityData.name.length > 10
          ? cityData.name.slice(0, 8) + "..."
          : cityData.name}
        <img
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${cityData.sys.country}.svg`}
          alt=""
          className="w-4 ml-2 sm:w-8 sm:ml-4"
        />
      </h1>
      <CityWeatherStatus data={cityData} />
    </div>
  );
};

const NearbyCities = ({ sendData, data, units }) => {
  const [citiesData, setCitiesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data !== null) {
          const result = await fetchWeatherCities(
            data.coord.lat,
            data.coord.lon,
            "metric"
          );
          setCitiesData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <div className="mb-6">
      <h1 className="sm:text-xl m-4">See Weather in Nearby Cities</h1>
      <div className=" grid grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-3 lg:grid-rows-1 lg:grid-cols-6 justify-items-center h-fit gap-2 mb-2">
        {citiesData &&
        citiesData[0] &&
        citiesData[1] &&
        citiesData[2] &&
        citiesData[3] &&
        citiesData[4] &&
        citiesData[5] ? (
          citiesData.map((city, index) => (
            <City
              key={index}
              setCitiesData={setCitiesData}
              sendData={sendData}
              cityData={city}
            />
          ))
        ) : (
          <>
            <ShimmerCity />
            <ShimmerCity />
            <ShimmerCity />
            <ShimmerCity />
            <ShimmerCity />
            <ShimmerCity />
          </>
        )}
      </div>
    </div>
  );
};
export default NearbyCities;
