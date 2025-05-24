import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Shimmer } from "./Shimmer";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../App";

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
      <div
        className={`absolute w-full h-full bg-[rgba(0,0,0,0.6)] pointer-events-none ${
          darkMode ? "" : "hidden"
        }`}
      ></div>
      <MapContainer
        key={JSON.stringify(center)}
        center={center}
        zoom={13}
        className="h-full w-full rounded-2xl absolute -z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}></Marker>
      </MapContainer>
    </>
  ) : (
    <Shimmer width="w-full" height="h-full" />
  );
};

export default WeatherMap;
