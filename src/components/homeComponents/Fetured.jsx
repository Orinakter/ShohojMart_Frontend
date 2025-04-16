import React from "react";
import gameBar from "../../assets/images/console.jpg";
import soundbar from "../../assets/images/soundbar.webp";
import homeApplience from "../../assets/images/home-applience.jpg";
import phone from "../../assets/images/phone.webp";
import laptop from "../../assets/images/laptop.webp";
import { Link } from "react-router";

const Fetured = () => {
  return (
    <div className="px-4 py-10 mb-12 bg-gray-100">
      <div className="container mx-auto">
        {/* offer product */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* div 1 */}
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={gameBar}
              alt=""
              className="rounded-md w-full lg:h-[350px] duration-500 hover:scale-110"
            />
            <div className="absolute bottom-4 right-4">
              <p className="font-bold text-xl mb-3">Buy 1 Get 1</p>
              <h1 className="text-4xl font-bold text-yellow-600">Free</h1>
            </div>
            <div className="absolute bottom-6 left-4">
              <p className="border-b-4 font-medium text-xl pb-2 border-yellow-600">
                Console
              </p>
            </div>
          </div>
          {/* div 2 */}
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={soundbar}
              alt=""
              className="rounded-md w-full lg:h-[350px] duration-500 hover:scale-110"
            />
            <div className="absolute bottom-4 right-4">
              <p className="font-bold text-xl text-white mb-3">Sale OFF</p>
              <h1 className="text-4xl font-bold text-yellow-600">30%</h1>
            </div>
            <div className="absolute bottom-6 left-4">
              <p className="border-b-4 text-white font-medium text-xl pb-2 border-yellow-600">
                Sound Bar
              </p>
            </div>
          </div>
          {/* div 3 */}
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={homeApplience}
              alt=""
              className="rounded-md w-full lg:h-[350px] duration-500 hover:scale-110"
            />
            <div className="absolute bottom-4 right-4">
              <p className="font-bold text-xl text-white mb-3">Sale OFF</p>
              <h1 className="text-4xl font-bold  text-blue-800">45%</h1>
            </div>
            <div className="absolute bottom-6 left-4">
              <p className="border-b-4 font-medium text-xl pb-2 text-white border-yellow-600">
                Home appliances
              </p>
            </div>
          </div>
        </div>
        {/* best sales */}
        <div className="grid mt-8 grid-cols-1 gap-8 lg:grid-cols-2">
          {/* div 1 */}
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={phone}
              alt=""
              className="rounded-md w-full lg:h-[450px] duration-500 hover:scale-110"
            />
            <div className="absolute bottom-4 right-4">
              <Link to={'/collection?category=Mobile Phones'}>
              <button className="py-2 cursor-pointer px-8 duration-300 bg-white text-black hover:bg-transparent hover:text-black font-medium rounded-full border border-white">
                Shop Now
              </button>
              </Link>
            </div>
            <div className="absolute bottom-6 left-4">
              <p className="border-b-4 font-medium text-white text-xl mb-6 pb-2 border-yellow-600">
                Best Sale
              </p>
              <h1 className="text-4xl font-bold text-white">Mobile Phone</h1>
            </div>
          </div>
          {/* div 2 */}
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={laptop}
              alt=""
              className="rounded-md w-full lg:h-[450px] duration-500 hover:scale-110"
            />
            <div className="absolute bottom-4 right-4">
            <Link to={'/collection?category=Laptops Tablets'}>
              <button className="py-2 cursor-pointer px-8 duration-300 bg-white text-black hover:bg-transparent hover:text-black font-medium rounded-full border border-white">
                Shop Now
              </button>
              </Link>
            </div>
            <div className="absolute bottom-6 left-4">
              <p className="border-b-4 font-medium text-white text-xl mb-6 pb-2 border-yellow-600">
                Best Sale
              </p>
              <h1 className="text-4xl font-bold text-white">Laptop</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fetured;
