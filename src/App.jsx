import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import WeatherMap from "./components/WeatherMap";
import Error from "./components/Error";
import Footer from "./components/Footer";
import { useState, createContext } from "react";
import "./index.css";

export const ThemeContext = createContext(false);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-col items-center bg-gray-50 text-[#1a1814] dark:bg-black dark:text-white ${
        darkMode && "dark"
      }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <ThemeContext.Provider value={darkMode}>
        <Outlet darkMode={darkMode} />
      </ThemeContext.Provider>

      <Footer darkMode={darkMode} />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <Body />,
      },
      {
        path: "/weatherMap",
        element: <WeatherMap />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default appRouter;
