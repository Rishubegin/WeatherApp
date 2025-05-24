import {
  GITHUB_ICON,
  GMAIL_ICON,
  LIGHT_GITHUB_ICON,
  LIGHT_GMAIL_ICON,
  LIGHT_LINKEDIN_ICON,
  LIGHT_PORTFOLIO_ICON,
  LINKEDIN_ICON,
  PORTFOLIO_ICON,
} from "../utils/constant";

const Info = ({ icon, link, name }) => {
  return (
    <a
      href={link}
      className="flex items-center hover:underline hover:cursor-pointer"
      target="_main"
    >
      <img className="w-6 sm:w-8 mr-2 " src={icon} alt="" />
      <span className="hidden lg:inline">{name}</span>
    </a>
  );
};
const Footer = ({ darkMode }) => {
  return (
    <div className="w-screen flex flex-col sm:flex-row justify-around items-center bg-gray-200 text-sm sm:text-xl dark:bg-black">
      <div className="flex w-full sm:w-6/10 md:7/10 justify-around mt-4 mb-2">
        <Info
          icon={darkMode ? LIGHT_GITHUB_ICON : GITHUB_ICON}
          link="https://github.com/Rishubegin"
          name="Github"
        />
        <Info
          icon={darkMode ? LIGHT_LINKEDIN_ICON : LINKEDIN_ICON}
          link="https://www.linkedin.com/in/rishabh-b9a5b2293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          name="LinkedIn"
        />
        <Info
          icon={darkMode ? LIGHT_PORTFOLIO_ICON : PORTFOLIO_ICON}
          link="#"
          name="Portfolio"
        />
        <Info
          icon={darkMode ? LIGHT_GMAIL_ICON : GMAIL_ICON}
          link="mailto:hrishabho40@gmail.com"
          name="Gmail"
        />
      </div>

      <p className="mt-2 mb-4 sm:mb-2 xl:w-3/10 text-center tracking-wider ">
        &copy; Rishabh Ajay Prakash
      </p>
    </div>
  );
};

export default Footer;
