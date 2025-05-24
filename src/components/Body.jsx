import { useState, useEffect, createContext } from "react";
import DateAndSearch from "./Body-Components/DateAndSearch";
import WeatherInfo from "./Body-Components/WeatherInfo";
import FiveDayOverview from "./Body-Components/FiveDayOverview";
import WeatherMap from "./WeatherMap";
import NearbyCities from "./Body-Components/NearbyCities";
import UpComingHours from "./Body-Components/UpComingHours";

export const ThemeCelcius = createContext(false);

const Body = () => {
  const [dataFromSearch, setDataFromSearch] = useState(null);
  const [units, setUnits] = useState("metric");

  const handleSearchData = (data) => {
    setDataFromSearch(data);
  };

  return (
    <div
      className="max-w-[1500px] w-screen font-(family-name:--font-roboto) overflow-x-hidden dark:bg-gray-950"
      id="body"
    >
      <ThemeCelcius.Provider value={{ units, setUnits }}>
        <DateAndSearch sendData={handleSearchData} />

        <div className="flex flex-col md:flex-row w-full ">
          <div
            className="bg-gray-200 mt-4 ml-4 mr-4 md:mr-0 dark:text-white dark:bg-gray-800"
            id=""
          >
            <WeatherInfo data={dataFromSearch} />
          </div>
          <div className="flex md:flex-1  justify-center items-center mt-4 mr-4 ml-4 h-72 md:h-118 lg:h-89 relative z-1">
            <WeatherMap data={dataFromSearch} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-5 ">
          <div
            className="flex-1 overflow-scroll flex items-end bg-gray-200 text-[#2E2A23] rounded-2xl ml-4 mr-4 mb-4 lg:mb-0 dark:text-white dark:bg-gray-800"
            id="full-day-overview "
          >
            <div className="">
              <UpComingHours data={dataFromSearch} />
            </div>
          </div>

          <div className="bg-gray-200 ml-2 mr-2 lg:ml-0 dark:text-white dark:bg-gray-800">
            <FiveDayOverview data={dataFromSearch} />
          </div>
        </div>
        <div>
          <NearbyCities
            units={units}
            sendData={handleSearchData}
            data={dataFromSearch}
          />
        </div>
      </ThemeCelcius.Provider>
    </div>
  );
};

export default Body;
