import { Link } from "react-router";
import { useState } from "react";
import {
  MENU_PATH,
  LOGO_URL,
  DARK_MODE,
  LIGHT_MODE,
  LIGHT_MENU_PATH,
  LIGHT_LOGO_URL,
} from "../utils/constant";

const Header = ({ darkMode, setDarkMode }) => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="relative overflow-visible flex p-3 justify-between items-center h-20 sm:h-auto w-screen bg-gray-300 dark:bg-black">
      <div className="flex">
        <div>
          <img
            className="w-10 sm:w-18"
            src={darkMode ? LIGHT_LOGO_URL : LOGO_URL}
            alt="logo"
          />
        </div>
        <div className="text-xl sm:text-3xl p-3 font-bold">
          <h1>CloudCast</h1>
        </div>
      </div>

      <nav className="hidden sm:flex flex-row-reverse w-1/2 ">
        <ul className="flex flex-col sm:flex-row justify-around items-center w-full xl:w-3/4 text-xl">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/" className="hover:underline">
            <li>About</li>
          </Link>
          <button onClick={handleDarkMode} className="">
            <img
              src={darkMode ? LIGHT_MODE : DARK_MODE}
              className={`${
                darkMode ? "rotate-180" : "rotate-0"
              } w-4 sm:w-6 md:w-8 cursor-pointer transition-transform duration-200`}
              alt=""
            />
          </button>
        </ul>
      </nav>

      <div className="flex w-1/3 justify-around sm:hidden">
        <button onClick={handleDarkMode} className="sm:hidden">
          <img
            src={darkMode ? LIGHT_MODE : DARK_MODE}
            className={`${
              darkMode ? "rotate-180" : "rotate-0"
            } w-6 md:w-8 cursor-pointer transition-transform duration-200`}
            alt=""
          />
        </button>
        <div
          className={`sm:hidden flex justify-center transition-width duration-300`}
          onClick={handleButtonClick}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          <button
            className={
              "overflow-visible sm:hidden mt-7 mb-7 hover:cursor-pointer w-fit"
            }
          >
            <img
              className="fill-black w-8"
              src={darkMode ? LIGHT_MENU_PATH : MENU_PATH}
              alt=""
            />
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 flex flex-col items-center sm:hidden mr-3 mt-20 h-170 transition-all duration-300 overflow-hidden ${
          isActive ? "w-1/6" : "w-0"
        }`}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        <nav className="mt-5 bg-gray-300 z-100 dark:bg-gray-700">
          <ul className="flex flex-col items-center w-full text-xl">
            <Link to="/" className="hover:underline mt-2 mb-2">
              Home
            </Link>
            <Link to="/" className="hover:underline mt-2 mb-2">
              <li>About</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
