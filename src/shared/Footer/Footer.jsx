import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaSnapchatGhost, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-10 px-5 md:px-20">
      <footer className="container mx-auto ">
        <div className="text-center mb-6">
          <h2 className="font-bold text-lg">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p className="text-gray-600 text-sm">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="mt-4 flex justify-center items-center gap-3">
            <input
              type="email"
              placeholder="enter your email address"
              className="p-2 border-2  border-gray-300 rounded-l-full rounded-r-full  w-64 md:w-80 shadow-xl"
            />
            <button className="bg-blue-900 rounded-l-full text-white font-semibold px-5 py-2 rounded-r-full">
              Submit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700 text-sm">
          <div className="mt-4">
            <h3 className="font-bold mb-2">SHOP</h3>
            <ul className="space-y-1">
              <li>Electronics</li>
              <li>Computers & Laptops</li>
              <li>Smartphones & Tablets</li>
              <li>Cameras</li>
              <li>Video Games & Systems</li>
              <li>Home Furniture</li>
              <li>Weekly Special</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2">FURTHER INFO.</h3>
            <ul className="space-y-1">
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2">CUSTOMER SERVICE</h3>
            <ul className="space-y-1">
              <li>Search Terms</li>
              <li>Advanced Search</li>
              <li>Orders And Returns</li>
              <li>Contact Us</li>
              <li>Theme FAQs</li>
              <li>Consultant</li>
              <li>Store Locations</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2 text-2xl">sohojmart+</h3>
            <span className="flex gap-3 items-center mb-3">
              <FaLocationDot className="text-lg" />
              <p>
                Pabna 6600 <br></br>
                Pabna, Rajshahi, BD
              </p>
            </span>
            <span className="flex gap-3 items-center mb-3">
              <IoCall className="text-lg" />
              <p>
                Call us at{" "}
                <a href="" className="text-gray-700">
                  +8801771814597
                </a>
              </p>
            </span>
            <span className="flex gap-3 items-center mb-3">
              <MdEmail className="text-lg" />
              <p>
                Email:{" "}
                <a href="" className="text-text-700">
                  hayderbd4290@gmail.com
                </a>
              </p>
            </span>

            <div className="flex space-x-4 mt-3">
              <span className="">
                {" "}
                <FaFacebookF className="text-white bg-gray-700 rounded-full  text-xl cursor-pointer" />
              </span>
              <FaInstagram className="text-white bg-gray-700 rounded-full  text-xl cursor-pointer" />
              <FaPinterestP className="text-white bg-gray-700 rounded-full  text-xl cursor-pointer" />
              <FaSnapchatGhost className="text-white bg-gray-700 rounded-full  text-xl cursor-pointer" />
              <FaTwitter className="text-white bg-gray-700 rounded-full  text-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
