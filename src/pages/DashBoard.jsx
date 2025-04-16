import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import DashBoardAside from "../components/dashBoardComponents/DashBoardAside";
import { FaBars } from "react-icons/fa";
import DashBorardAsideMobile from "../components/dashBoardComponents/DashBorardAsideMobile";

const DashBoard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [aside, setAside] = useState(true);

  return (
    <div className="flex relative">
      <div className="py-2 flex justify-between px-4 fixed z-10 top-0 left-0 bg-blue-100 lg:hidden w-full">
        <button
        onClick={()=> setAside(!aside)} 
        className="text-2xl cursor-pointer">
          <FaBars />
        </button>
        <Link to="/">
          <h1 className="text-xl font-bold">
            <span className="italic">shohoj</span>
            <span className="text-yellow-400">Mart+</span>
          </h1>
        </Link>
      </div>
      {/* aside */}
      <div className="lg:w-2/12 p-6 hidden lg:flex lg:flex-col bg-blue-800 text-white min-h-[100vh]">
        <DashBoardAside />
      </div>
      {/* dashBoard Aside Mobile */}
      <div className={`w-8/12 px-4 fixed duration-500 top-12 ${aside?'-left-[1400px]':'left-0'} z-10 lg:hidden  min-h-[100vh]  bg-blue-700 text-white`}>
        <DashBorardAsideMobile setAside={setAside} aside={aside} />
      </div>
      {/* page-content */}
      <div className="w-full lg:w-10/12 bg-gray-100 px-3 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
