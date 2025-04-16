import noData from "../../Lottie/noData.json";
import Lottie from "react-lottie";

const NoData = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };
  return (
    <div>
      <h1 className="text-3xl md:text-4xl text-center font-semibold mb-6">
        No Data found!
      </h1>
      <div className="md:max-w-[500px] mx-auto ">
        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
      </div>
    </div>
  );
};

export default NoData;