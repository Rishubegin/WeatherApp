import {
  WIND_ICON,
  DROP_ICON,
  VISIBILITY_ICON,
  PRESSURE_ICON,
  UVINDEX_ICON,
  TEMPRATURE_ICON,
} from "../utils/constant";

export const Shimmer = ({ height, width }) => {
  return (
    <div
      className={`inline-flex animate-pulse bg-gray-400 rounded m-0.5 ${height} ${width}`}
    >
      <div className=""></div>
    </div>
  );
};

export const WeatherDetailsShimmer = () => {
  return (
    <div className="flex justify-around m-4 sm:m-0 mr-8 ">
      <div>
        <div>
          <img src={WIND_ICON} className="w-8 sm:w-10 inline" alt="" />
          <Shimmer height="h-5 sm:h-8" width="w-20 sm:w-30" />
        </div>
        <div>
          <img src={DROP_ICON} className="w-8 sm:w-10 inline" alt="" />
          <Shimmer height="h-5 sm:h-8" width="w-20 sm:w-30" />
        </div>
        <div>
          <img src={PRESSURE_ICON} className="w-8 sm:w-10 inline" alt="" />
          <Shimmer height="h-5 sm:h-8" width="w-20 sm:w-30" />
        </div>
      </div>
      <div>
        <div>
          <img src={VISIBILITY_ICON} className="w-8 sm:w-10 inline" alt="" />
          <Shimmer height="h-5 sm:h-8" width="w-20 sm:w-30" />
        </div>
        <div>
          <img src={UVINDEX_ICON} className="w-8 sm:w-10 inline" alt="" />
          <Shimmer height="h-5 sm:h-8" width="w-20 sm:w-30" />
        </div>
        <div>
          <img src={TEMPRATURE_ICON} className="w-8 sm:w-10 inline" alt="" />
          <Shimmer height="h-5 sm:h-8" width="w-20 sm:w-30" />
        </div>
      </div>
    </div>
  );
};

export const ShimmerCity = () => {
  return (
    <div className="bg-gray-300 flex flex-col items-center w-35 sm:w-40 h-fit rounded-3xl">
      <Shimmer height=" h-4 sm:h-6 m-4" width="w-20" />
      <div className="flex flex-row items-center">
        <Shimmer width="w-12" height="h-10" />
        <div className="flex flex-col">
          <Shimmer height="h-8" width=" w-12 sm:w-15" />
          <Shimmer height="h-3" width="w-15 sm:w-18" />
        </div>
      </div>
      <Shimmer height="h-4 sm:h-6 m-2" width="w-20" />
    </div>
  );
};
