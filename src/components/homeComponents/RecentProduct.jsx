import useProduct from "../../hooks/useProduct";
import LoaderSipnner from "../common/LoaderSipnner";
import Slider from "../slider/Slider";
import SliderTitle from "../slider/SliderTitle";

const RecentProduct = () => {
  const { productData, isLoading } = useProduct("", 8, "recent");
  

  return (
    <div className="container mx-auto">
      <div className="">
        <SliderTitle title={"Feature"} />
      </div>
      <div className="">
        {isLoading ? (
          <LoaderSipnner />
        ) : (
          <Slider data={productData} class1={"prev-2"} class2={"next-2"} />
        )}
      </div>
    </div>
  );
};

export default RecentProduct;
