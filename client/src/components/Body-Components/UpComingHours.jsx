import { AreaChart, Area, XAxis, ReferenceLine } from "recharts";
import {
  fetchHourlyData,
  getTimeInHour,
  celciusToFahrenheit,
  iconLink,
} from "../../utils/functions";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { ThemeCelcius } from "../Body";

const HourlyTemprature = ({ hourlyData }) => {
  const [list, setList] = useState(null);
  const [timeZone, setTimeZone] = useState(null);

  const [chartWidth, setChartWidth] = useState(2500);
  const [chartMargin, setChartMargin] = useState(30);

  const darkMode = useContext(ThemeContext);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setChartWidth(2500);
      setChartMargin(30);
    } else {
      setChartWidth(3160);
      setChartMargin(40);
    }
  }, []);
  useEffect(() => {
    if (hourlyData !== null) {
      setList(hourlyData.list);
      setTimeZone(hourlyData.city.timezone);
    }
  }, [hourlyData]);

  return list ? (
    <AreaChart
      width={chartWidth}
      height={150}
      data={list}
      margin={{
        top: 20,
        right: 40,
        left: chartMargin,
        bottom: 10,
      }}
    >
      <Area
        type="linear"
        dataKey="main.temp"
        stroke={darkMode ? "#99a1af" : "#8884d8"}
        fillOpacity={1}
        fill={darkMode ? "#99a1af" : "#5C9CE6"}
      />
      <XAxis
        dataKey="main.temp"
        tickFormatter={(temp) => {
          return "";
        }}
      />
      {list.map((entry, index) => (
        <ReferenceLine
          key={index}
          x={index}
          stroke={darkMode ? "white" : "black"}
        />
      ))}
    </AreaChart>
  ) : (
    <div>data not fetched</div>
  );
};

const UpComingHours = ({ data }) => {
  const [hourlyData, setHourlyData] = useState(null);
  const { units, setUnits } = useContext(ThemeCelcius);

  useEffect(() => {
    if (data !== null) {
      fetchHourlyData(data.coord.lat, data.coord.lon).then((result) => {
        setHourlyData(result);
      });
    }
  }, [data]);

  return hourlyData ? (
    <div className="relative">
      <div className="h-15 relative ">
        <p className="sticky w-fit left-5 top-5">Upcoming Hours</p>
      </div>
      <div className="flex w-full justify-around  box-border text-sm sm:text-[16px]">
        {hourlyData.list.map((entry, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="whitespace-nowrap ">
              {getTimeInHour(entry.dt, hourlyData.city.timezone)}
            </p>
            <img
              src={iconLink(entry.weather[0].icon)}
              alt="icon"
              className="w-10"
            />
            <p key={index} className="text-center">
              {units === "metric"
                ? Math.round(entry.main.temp)
                : celciusToFahrenheit(entry.main.temp)}
              °
            </p>
          </div>
        ))}
      </div>
      <HourlyTemprature hourlyData={hourlyData} />
      <div className="flex w-full justify-around  box-border mb-2 absolute overflow-hidden bottom-0 text-sm sm:text-[16px]">
        {hourlyData.list.map((entry, index) => (
          <div key={index} className="">
            {entry.main.humidity}%
          </div>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
};
export default UpComingHours;

{
  /* <LineChart width={4000} height={200} data={list}>
  <Line type="monotone" dataKey="main.temp" stroke="#000" />
  <CartesianGrid stroke="#ccc" />
  <XAxis
    dataKey="dt"
    tickFormatter={(timestamp) => {
      return getTimeInHour(timestamp, timeZone);
    }}
  />
  <YAxis />
  <Tooltip
    labelFormatter={(timestamp) => getTimeInHour(timestamp, timeZone)}
    formatter={(value) => [`${value}°C`, "Temp"]}
  />
</LineChart>; */
}
