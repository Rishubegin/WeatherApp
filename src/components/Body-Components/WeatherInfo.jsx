import {
  Aqi,
  SunriseSunset,
  WeatherStatus,
  WeatherDetails,
  LocationAndTime,
} from "./WeatherInfoComponents";

import { fetchAQI, calculateAQI } from "../../utils/functions";
import { useState, useEffect } from "react";

const WeatherInfo = ({ data }) => {
  const [aqiData, setAqiData] = useState(null);
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    if (data !== null) {
      fetchAQI(data.coord.lat, data.coord.lon).then((result) => {
        setAqiData(result);
      });
    }
  }, [data]);

  useEffect(() => {
    if (aqiData !== null) {
      const pm25 = aqiData.list[0].components.pm2_5;
      const aqiValue = calculateAQI(pm25);
      setAqi(aqiValue);
    }
  }, [aqiData]);

  return (
    <div className="grid grid-cols-2 grid-rows-[repeat(10,_40px)] sm:grid-rows-[repeat(11,_35px)] lg:grid-rows-[repeat(5,_70px)]  lg:grid-cols-[repeat(6,_100px)] p-2 pt-0 items-center">
      <div className="row-start-1 row-end-2 lg:row-end-2 col-start-1 col-end-3 sm:col-end-7 h-full ">
        <LocationAndTime data={data} />
      </div>
      <div className="row-start-2 sm:row-start-3 lg:row-start-2 row-end-5 sm:row-end-6 lg:row-end-4 col-start-1 col-end-3 lg:col-end-4 flex justify-center items-center">
        <WeatherStatus data={data} />
      </div>
      <div className="row-start-5 sm:row-start-6 row-end-8 sm:row-end-10 lg:row-start-4 lg:row-end-6 col-start-1 col-end-3 lg:col-end-5 ">
        <WeatherDetails data={data} />
      </div>
      <div className="row-start-8 sm:row-start-10 row-end-11 sm:row-end-13 lg:row-start-2 lg:row-end-4 col-start-1 col-end-2 lg:col-start-4 lg:col-end-7 flex justify-center">
        <Aqi aqi={aqi} aqiData={aqiData} />
      </div>
      <div className="row-start-8 sm:row-start-10 row-end-11 sm:row-end-13 lg:row-start-4 lg:row-end-6 col-start-2 col-end-3 lg:col-start-5 lg:col-end-7">
        <SunriseSunset data={data} />
      </div>
    </div>
  );
};

export default WeatherInfo;
