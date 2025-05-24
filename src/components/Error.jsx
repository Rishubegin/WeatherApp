import { ERROR_PATH } from "../utils/constant";

const Error = () => {
  return (
    <div className="error-container flex justify-center items-center bg-yellow-400 h-screen">
      <div className="error-div ">
        <h1 className="text-center text-5xl font-bold p-5">Error 404</h1>
        <img src={ERROR_PATH} alt="lawden_bhujyam" />
        <h1 className="text-center text-5xl font-bold p-5">
          Page does not exist
        </h1>
      </div>
    </div>
  );
};

export default Error;
