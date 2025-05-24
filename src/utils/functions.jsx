import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  SUN_ICON,
  MOON_ICON,
  CLOUDYDAY_ICON,
  CLOUDYNIGHT_ICON,
  CLOUD_ICON,
  HEAVYCLOUDS_ICON,
  RAINY_ICON,
  RAINYDAY_ICON,
  RAINYNIGHT_ICON,
  THUNDERSTORM_ICON,
  SNOW_ICON,
  WIND_ICON,
} from "./constant";
countries.registerLocale(enLocale);

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const USERNAME = import.meta.env.VITE_GEONAME_USERNAME;

//https://api.openweathermap.org/data/2.5/weather?lat=26.8381&lon=80.9346001&units=metric&appid=7bc8dca4ee01e36de79f4ce29f248ca3

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let count = 0;
export const fetchWeatherdata = async (lat, lon, units) => {
  await delay(500);
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );
  const json = await data.json();
  console.log(json.name, ++count);
  return json;
};

export const fetchLatLon = async (cityName, countryCode) => {
  const data = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=10&appid=${API_KEY}`
  );
  const json = await data.json();

  if (!json.length || !json) {
    return null;
  }

  return json;

  // const { lat, lon } = json[0];
  // console.log(lat, lon);
  // return fetchWeatherdata(lat, lon);
};

export const fetchAQI = async (lat, lon) => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const json = await data.json();
  return json;
};

export const fetchHourlyData = async (lat, lon) => {
  const hourlyData = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const json = await hourlyData.json();
  return json;
};

export const fetchNearByCities = async (lat, lon) => {
  const cityData = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&cities=cities15000&radius=200&maxRows=120&username=${USERNAME}`
  );
  const json = await cityData.json();
  return await json;
};

export function getDateFromOffset(timestamp, offsetInSeconds) {
  const utcDate = new Date((timestamp + offsetInSeconds) * 1000);

  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };

  return utcDate.toLocaleDateString("en-US", options);
}

export function getDateWithoutYear(timestamp, offsetInSeconds) {
  const utcDate = new Date((timestamp + offsetInSeconds) * 1000);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  };

  return utcDate.toLocaleDateString("en-US", options);
}

export function getTimeFromOffset(timestamp, offsetInSeconds) {
  const utcDate = new Date((timestamp + offsetInSeconds) * 1000);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  return utcDate.toLocaleTimeString("en-US", options);
}

export function getTimeInHour(timestamp, offsetInSeconds) {
  const utcDate = new Date((timestamp + offsetInSeconds) * 1000);

  const options = {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  return utcDate.toLocaleTimeString("en-US", options);
}

export const getCountryName = (countryCode) => {
  let countryName;
  switch (countryCode) {
    case "AG":
      countryName = "Antigua & Barbuda";
      break;

    case "BA":
      coutryName = "Bosnia";
      break;

    case "IO":
      countryName = "British IO Territory";
      break;

    case "CF":
      countryName = "CAR";
      break;

    case "CN":
      countryName = "China";
      break;

    case "CC":
      countryName = "Cocos Islands";
      break;

    case "CG":
      countryName = "Congo";
      break;

    case "CD":
      countryName = "DR Congo";
      break;

    case "FK":
      countryName = "Falklands";
      break;

    case "GM":
      countryName = "The Gambia";
      break;

    case "HM":
      countryName = "HIMI";
      break;

    case "VA":
      countryName = "Vatican City";
      break;

    case "IR":
      countryName = "Iran";
      break;

    case "LA":
      countryName = "Laos";
      break;

    case "MK":
      countryName = "North Macedonia";
      break;

    case "FM":
      countryName = "Micronesia";

    case "MD":
      countryName = "Moldova";
      break;

    case "MP":
      countryName = "Mariana Islands";
      break;

    case "PS":
      countryName = "Palestine";
      break;

    case "PG":
      countryName = "PNG";
      break;

    case "KN":
      countryName = "St. Kitts";
      break;

    case "VC":
      countryName = "St. Vincent";
      break;

    case "ST":
      countryName = "Sao Tome & Principe";
      break;

    case "GS":
      countryName = "SGSSI";
      break;

    case "SJ":
      countryName = "Svalbard";
      break;

    case "SY":
      countryName = "Syria";
      break;

    case "TW":
      countryName = "Taiwan";
      break;

    case "TZ":
      countryName = "Tanzania";
      break;

    case "TT":
      countryName = "Trinidad & Tobago";
      break;

    case "TC":
      countryName = "Turks & Caicos";
      break;

    case "AE":
      countryName = "UAE";
      break;

    case "US":
      countryName = "USA";
      break;

    case "UM":
      countryName = "USMOI";
      break;

    case "VG":
      countryName = "Virgin Isl, British";
      break;

    case "VI":
      countryName = "Virgin Isl, U.S";
      break;

    case "WF":
      countryName = "Wallis & Futuna";
      break;

    default:
      countryName = countries.getName(countryCode, "en");
  }

  return countryName;
};

export const iconLink = (iconId) => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};

export const weatherIcon = (iconId) => {
  if (iconId === "01d") return SUN_ICON;
  else if (iconId === "01n") return MOON_ICON;
  else if (iconId === "02d") return CLOUDYDAY_ICON;
  else if (iconId === "02n") return CLOUDYNIGHT_ICON;
  else if (iconId === "03d" || iconId === "03n") return CLOUD_ICON;
  else if (iconId === "04d" || iconId === "04n") return HEAVYCLOUDS_ICON;
  else if (iconId === "09d" || iconId === "09n") return RAINY_ICON;
  else if (iconId === "10d") return RAINYDAY_ICON;
  else if (iconId === "10n") return RAINYNIGHT_ICON;
  else if (iconId === "11d" || iconId === "11n") return THUNDERSTORM_ICON;
  else if (iconId === "13d" || iconId === "13n") return SNOW_ICON;
  else if (iconId === "50d" || iconId === "50n") return WIND_ICON;
};
export const calculateAQI = (pm25) => {
  const breakpoints = [
    { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
  ];

  for (let bp of breakpoints) {
    if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
      const { cLow, cHigh, iLow, iHigh } = bp;
      const aqi = ((iHigh - iLow) / (cHigh - cLow)) * (pm25 - cLow) + iLow;
      return Math.round(aqi);
    }
  }

  return null; // Value out of range
};

export const aqiCategory = (aqi) => {
  let category;
  if (aqi > 0 && aqi <= 50) category = "Good";
  else if (aqi > 50 && aqi <= 100) category = "Moderate";
  else if (aqi > 100 && aqi <= 150) category = "Unhealthy for Sensitive Groups";
  else if (aqi > 150 && aqi <= 200) category = "Unhealthy";
  else if (aqi > 200 && aqi <= 300) category = "Very Unhealthy";
  else if (aqi > 300) category = "Hazardous";

  return category;
};

export const celciusToFahrenheit = (celcius) => {
  return Math.round((celcius * 9) / 5 + 32);
};

export function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export const msTomph = (ms) => {
  return (ms * 2.23694).toFixed(2);
};

export const mphToms = (mph) => {
  return (mph * 0.44704).toFixed(2);
};
function calculateMode(arr) {
  if (arr.length == 0) return "01d";

  const frequency = {};
  let maxFreq = 0;
  let modes = [];

  for (let item of arr) {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxFreq) {
      maxFreq = frequency[item];
    }
  }

  for (let item in frequency) {
    if (frequency[item] === maxFreq) {
      modes.push(item);
    }
  }
  return modes[0];
}

const calcDayData = (hourlyData) => {
  let minTemp = 100,
    maxTemp = 0,
    humidity = 0,
    feelsLike = 0,
    pressure = 0,
    visibility = 0,
    windSpeed = 0,
    icon = [],
    count = 0;
  hourlyData.forEach((val) => {
    minTemp = Math.min(minTemp, val.main.temp);
    maxTemp = Math.max(maxTemp, val.main.temp);
    feelsLike += val.main.feels_like;
    humidity += val.main.humidity;
    pressure += val.main.pressure;
    visibility += val.visibility;
    windSpeed += val.wind.speed;
    count++;
    if (val.weather[0].icon != "01d" && val.weather[0].icon != "01n")
      icon.push(val.weather[0].icon);
  });
  let state = calculateMode(icon);
  let weatherStatus;
  if (state === "01d") {
    weatherStatus = {
      main: "Clear",
      description: "clear sky",
      icon: state,
    };
  } else {
    hourlyData.forEach((val) => {
      if (val.weather[0].icon === state) {
        weatherStatus = {
          main: val.weather[0].main,
          description: val.weather[0].description,
          icon: val.weather[0].icon,
        };
      }
    });
  }
  return {
    dt: hourlyData[0].dt,
    minTemp: Math.round(minTemp),
    maxTemp: Math.round(maxTemp),
    feelsLike: parseFloat((feelsLike / count).toFixed(2)),
    humidity: Math.round(humidity / count),
    pressure: Math.round(pressure / count),
    visibility: Math.round(visibility / (count * 1000)),
    windSpeed: parseFloat((windSpeed / count).toFixed(2)),
    weatherStatus: weatherStatus,
  };
};

const fifthDayData = (days) => {
  let minTemp =
    (days[1].minTemp + days[2].minTemp + days[3].minTemp + days[4].minTemp) / 4;
  let maxTemp =
    (days[1].maxTemp + days[2].maxTemp + days[3].maxTemp + days[4].maxTemp) / 4;
  let humidity =
    (days[1].humidity +
      days[2].humidity +
      days[3].humidity +
      days[4].humidity) /
    4;
  let feelsLike =
    (days[1].feelsLike +
      days[2].feelsLike +
      days[3].feelsLike +
      days[4].feelsLike) /
    4;
  let pressure =
    (days[1].pressure +
      days[2].pressure +
      days[3].pressure +
      days[4].pressure) /
    4;
  let visibility =
    (days[1].visibility +
      days[2].visibility +
      days[3].visibility +
      days[4].visibility) /
    4;
  let windSpeed =
    (days[1].windSpeed +
      days[2].windSpeed +
      days[3].windSpeed +
      days[4].windSpeed) /
    4;
  const weatherStatus = days[Math.round(Math.random() * 4)].weatherStatus;

  return {
    dt: days[4].dt + 86400,
    minTemp: Math.round(minTemp),
    maxTemp: Math.round(maxTemp),
    feelsLike: parseFloat(feelsLike.toFixed(2)),
    humidity: Math.round(humidity),
    pressure: Math.round(pressure),
    visibility: Math.round(visibility),
    windSpeed: parseFloat(windSpeed.toFixed(2)),
    weatherStatus: weatherStatus,
  };
};

export const parseData = (data, dt) => {
  const day0 = [],
    day1 = [],
    day2 = [],
    day3 = [],
    day4 = [],
    day5 = [];
  data.list.forEach((val) => {
    if (val.dt >= dt && val.dt < dt + 86400) {
      day0.push(val);
    } else if (val.dt >= dt + 86400 && val.dt < dt + 2 * 86400) {
      day1.push(val);
    } else if (val.dt >= dt + 2 * 86400 && val.dt < dt + 3 * 86400) {
      day2.push(val);
    } else if (val.dt >= dt + 3 * 86400 && val.dt < dt + 4 * 86400) {
      day3.push(val);
    } else if (val.dt >= dt + 4 * 86400 && val.dt < dt + 5 * 86400) {
      day4.push(val);
    }
  });

  const days = [day0, day1, day2, day3, day4];

  const finalData = [];
  days.forEach((val) => {
    const calcData = calcDayData(val);
    finalData.push(calcData);
  });

  const fifthDay = fifthDayData(finalData);
  finalData.push(fifthDay);

  return finalData;
};

export const getCities = async (lat, lon) => {
  const json = await fetchNearByCities(lat, lon);
  const cities = json?.geonames ?? [];

  cities.shift(); // remove first city
  cities.sort((a, b) => b.population - a.population);
  cities.length = 10;
  cities.sort((a, b) => a.distance - b.distance);
  cities.length = 6;
  return cities;
};

export const fetchWeatherCities = async (lat, lon, units) => {
  const cities = await getCities(lat, lon);

  const cityWeatherPromises = cities.map((city) =>
    fetchWeatherdata(city.lat, city.lng, units)
  );

  const citiesData = await Promise.all(cityWeatherPromises);
  return citiesData;
};

//26.283084027624795, 82.07739748829876
const fetchLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve([null, null]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Geolocation error:", err); // optional logging
        resolve([null, null]);
      }
    );
  });
};

const fetchGeolocation = async (lat, lon) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const json = await data.json();
    return json;
  } catch (error) {
    console.error("Error fetching geolocation info:", error);
    return null;
  }
};

export const getExactLocation = async () => {
  let [lat, lon] = await fetchLocation();

  if (lat === null || lon === null) return [null, null];

  const info = await fetchGeolocation(lat, lon);

  if (!info || !info[0]) return [null, null];

  return [info[0].lat, info[0].lon]; // updated in case reverse lookup returns corrected coordinates
};
