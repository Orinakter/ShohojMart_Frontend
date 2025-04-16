import useProduct from "../../hooks/useProduct";
import LoaderSipnner from "../common/LoaderSipnner";
import Slider from "../slider/Slider";
import SliderTitle from "../slider/SliderTitle";

const TopPhones = () => {
  const { productData, isLoading } = useProduct("Mobile Phones", 7, "recent");

  return (
    <div className="container mx-auto">
      <div className="">
        <SliderTitle title={"Phones"} />
      </div>
      <div className="">
        {isLoading ? (
          <LoaderSipnner />
        ) : (
          <Slider data={productData} class1={"prev-3"} class2={"next-3"} />
        )}
      </div>
    </div>
  );
};

export default TopPhones;

