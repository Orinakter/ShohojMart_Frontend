import { Link } from "react-router";
import banner from "../../assets/images/banner-1.webp";

const Banner = () => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
        backgroundPosition: "top center",
      }}
      className="min-h-[60vh] w-full flex justify-center items-center"
    >
      <div className="container px-4 mx-auto">
        <div className="lg:w-4/12">
          <h1 className="text-4xl mb-6 md:text-5xl font-bold text-white">
            Huge Saving On our Product
          </h1>
          <p className="text-white  font-semibold mb-4">sale Upto 70% Off Our Product</p>
          <Link to={'/collection'}><button className="py-2  cursor-pointer px-8 duration-300 hover:bg-white hover:text-black text-white font-medium rounded-full border border-white">Shop Now</button></Link>
        </div>
        <div className="lg:w-4/12"></div>
        <div className="lg:w-4/12"></div>
      </div>
    </div>
  );
};

export default Banner;
