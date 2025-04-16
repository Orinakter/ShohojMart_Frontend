import useProduct from "../../hooks/useProduct";
import LoaderSipnner from "../common/LoaderSipnner";
import Slider from "../slider/Slider";
import SliderTitle from "../slider/SliderTitle";


const Televisons = () => {
    const { productData, isLoading } = useProduct("Televisions", 7, "recent");

  return (
    <div className="container mx-auto">
      <div className="">
        <SliderTitle title={"Televisions"} />
      </div>
      <div className="">
        {isLoading ? (
          <LoaderSipnner />
        ) : (
          <Slider data={productData} class1={"prev-4"} class2={"next-4"} />
        )}
      </div>
    </div>
  )
}

export default Televisons