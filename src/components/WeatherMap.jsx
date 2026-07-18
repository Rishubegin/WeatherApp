import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Shimmer } from "./Shimmer";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../App";

const ACCESS_TOKEN = import.meta.env.JAWG_ACCESS_TOKEN;

const WeatherMap = ({ data }) => {
  const [center, setCenter] = useState(null);

  const darkMode = useContext(ThemeContext);

  useEffect(() => {
    if (data !== null) {
      setCenter([data.coord.lat, data.coord.lon]); // Updates the map's center dynamically
    }
  }, [data]);

  return data ? (
    <>
      {/* <div
        className={`absolute w-full h-full bg-[rgba(0,0,0,0.6)] pointer-events-none ${
          darkMode ? "" : "hidden"
        }`}
      ></div> */}
      <MapContainer
        key={JSON.stringify(center)}
        center={center}
        zoom={13}
        className="h-full w-full rounded-2xl absolute -z-10"
      >
        <TileLayer
          attribution={
            darkMode
              ? "&copy; OpenStreetMap contributors &copy; CARTO"
              : "&copy; OpenStreetMap contributors"
          }
          url={
            darkMode
              ? `https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=cFq4gZ09FeZWK9uAtrpTqH3v9wWDKzwlaxQPKGLeeQ1jEdmsMJ6lmBdfv4xEFQ37`
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        {/* <Marker position={center}></Marker> */}
      </MapContainer>
    </>
  ) : (
    <Shimmer width="w-full" height="h-full" />
  );
};

export default WeatherMap;

{
  /* <TileLayer
  url={
    darkMode
      ? https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }
  attribution={
    darkMode
      ? '&copy; OpenStreetMap contributors &copy; CARTO'
      : '&copy; OpenStreetMap contributors'
  }
/> */
}
