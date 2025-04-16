import { useContext, useEffect, useState } from "react";
import { BsGift } from "react-icons/bs";
import { FaBars, FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { MdHelp, MdOutlineDashboardCustomize } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router";
import LoginFrom from "../../components/NavbarComponents/LoginFrom";
import useAuth from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { UtilitesContext } from "../../context/UtilitesProvider";
import useCart from "../../hooks/useCart";

const NavBar = () => {
  const {sign, setSignIn} = useContext(UtilitesContext)
  const [menu, setMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const { user, logOutUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true); 
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollThresholdReached, setScrollThresholdReached] = useState(false);
  const {cartData} = useCart();

  const logOutHandler =async ()=>{
    try{
      await logOutUser()
      navigate('/')
    }
    catch(err){
      setLoading(false)
      toast.error(err.message)
    }
  } 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 0) {
        setScrollThresholdReached(true);
      } else {
        setScrollThresholdReached(false);
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollPos > prevScrollPos && scrollThresholdReached) {
        setShowNav(false); 
      } else if (currentScrollPos < prevScrollPos && scrollThresholdReached) {
        setShowNav(true); 
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, scrollThresholdReached]);

  return (
    <div className={`py-3 fixed w-full z-20 top-0 duration-500 bg-blue-800 ${
      showNav ? "transform translate-y-0" : "transform -translate-y-full"
    }`}>
      <nav
      className={`max-w-[1300px] hidden lg:flex lg:flex-col px-4 mx-auto transition-transform duration-300 `}
    >
      {/* nav-1 */}
      <div className="text-white flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold">
            <span className="italic">shohoj</span>
            <span className="text-yellow-400">Mart+</span>
          </h1>
        </Link>
        {/* serch */}
        <div className="relative">
          <input
            type="text"
            placeholder="search store"
            className="px-4 py-2 min-w-[420px] rounded-full outline-0 bg-white text-black"
          />
          <p className="absolute top-2 cursor-pointer text-2xl text-black right-3">
            <IoSearchOutline />
          </p>
        </div>
        {/* icon */}
        <div className="flex justify-between items-center gap-6">
          <div className="text-sm">
            <p className="">Available 24/7 at</p>
            <p className="">+8801771814597</p>
          </div>
          <Link to={"/wishlist"}>
            <button className="flex text-yellow-400 flex-col cursor-pointer justify-center items-center">
              <span className="text-3xl ">
                <FaRegHeart />
              </span>
              <span className="text-sm font-light">Wish Lists</span>
            </button>
          </Link>
          {/* user condition------------------ */}
          <div className="relative">
            {user ? (
              <div onClick={() => setSubMenu(!subMenu)} className="cursor-pointer">
                {user?.photoURL ? (
                  <div>
                    <img
                      src={user?.photoURL}
                      referrerPolicy="no-referrer"
                      alt=""
                      className="w-10 h-10 rounded-full border border-yellow-300"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 flex justify-center font-bold items-center rounded-full bg-yellow-200 text-gray-900">
                    <h1 className="text-xl">
                      {user?.displayName?.slice(0, 2).toUpperCase()}
                    </h1>
                  </div>
                )}
                {/* user logOut */}
                <div
                  onMouseLeave={() => setSubMenu(false)}
                  className={`${
                    subMenu ? "flex flex-col justify-center" : "hidden"
                  } px-4 py-8 z-10 rounded-md w-[200px] text-gray-900 absolute top-12 -left-32 md:-left-24 bg-blue-200`}
                >
                  <div className=" ">
                    <Link to={'/userProfile'}>
                      <button className="flex  cursor-pointer hover:underline hover:text-blue-700 gap-2 items-center justify-center">
                        <span className=""><FaRegUser /></span>Update Profile
                      </button>
                    </Link>
                    <Link to={'dashboard'}>
                      <button className="flex mt-2 cursor-pointer hover:underline hover:text-blue-700 gap-2 items-center justify-center">
                        <span className=""><MdOutlineDashboardCustomize /></span>DashBoard
                      </button>
                    </Link>
                  </div>
                  <div className="divider"></div>
                  <button
                    onClick={logOutHandler}
                    className="border flex gap-2 items-center justify-center cursor-pointer border-blue-300 py-1 px-2 rounded-md">
                    <span className="">
                      <FiLogOut />
                    </span>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSignIn(!sign)}
                className="flex text-yellow-400 flex-col cursor-pointer justify-center items-center"
              >
                <span className="text-3xl">
                  <FaRegUser />
                </span>
                <span className="text-sm font-light">Sign In</span>
              </button>
            )}
          </div>
          {/* user condition----------------- */}
          <Link to={"/cart"}>
            <button className="flex relative text-yellow-400 flex-col cursor-pointer justify-center items-center">
              <span className="text-3xl">
                <IoCartOutline />
              </span>
              <span className="text-sm font-light">Cart</span>
              <span className="bg-blue-800 rounded-full text-xl text-white absolute -top-2 right-0">
                {cartData?.length}
              </span>
            </button>
          </Link>
        </div>
      </div>
      {/* nav-2 */}
      <div className="mt-8 flex justify-between">
        <ul className="flex gap-6 items-center text-white">
          <NavLink to={"/"}>
            <li className="">Home</li>
          </NavLink>
          <NavLink to={"/collection"}>
            <li className="">Collection</li>
          </NavLink>
          <NavLink to={"/contact"}>
            <li className="">Contact</li>
          </NavLink>
        </ul>
        {/* offer */}
        <div className="flex gap-6 cursor-pointer items-center">
          <Link to={"/help"}>
            <div className="flex items-center gap-2 border-gray-100 border-r-2 px-5">
              <p className="text-blue-400 text-xl">
                <MdHelp />
              </p>
              <p className="text-gray-100">Help</p>
            </div>
          </Link>
          <Link to={"/offers"}>
            <div className="flex items-center gap-2">
              <p className="text-orange-300">
                <BsGift />
              </p>
              <p className="text-gray-100">Offers</p>
            </div>
          </Link>
        </div>
      </div>
      {/* sidebar SignIn */}
      <div
        className={`bg-white hidden lg:flex lg:flex-col duration-700 px-6 py-10 shadow-2xl ${
          sign ? "fixed right-0 top-0" : "-right-[2000px] fixed top-0"
        }   z-10 w-[300px] md:w-[350px] p-12 h-[100vh]`}
      >
        <div className="flex mb-12 items-center text-xl justify-between">
          <p className="font-semibold">Login</p>
          <p onClick={() => setSignIn(!sign)} className="cursor-pointer">
            <RxCross2 />
          </p>
        </div>
        {/* login Form */}
        <LoginFrom setSignIn={setSignIn} />
      </div>
    </nav>

      {/* small Device Nav */}
      <div className="px-4 flex lg:hidden justify-between items-center">
        <button
          onClick={() => setMenu(!menu)}
          className="text-2xl text-white cursor-pointer"
        >
          <FaBars />
        </button>
        <div className="flex items-center gap-6">
          {/* user condition------------------ */}
          <div className="relative">
              {user ? (
                <div
                  onClick={() => setSubMenu(!subMenu)}
                  className="cursor-pointer"
                >
                  {user?.photoURL ? (
                    <div>
                      <img
                        src={user?.photoURL}
                        referrerPolicy="no-referrer"
                        alt=""
                        className="w-10 h-10 rounded-full border border-yellow-300"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex justify-center font-bold items-center rounded-full bg-yellow-200 text-gray-900">
                      <h1 className="text-xl">
                        {user?.displayName?.slice(0, 2).toUpperCase()}
                      </h1>
                    </div>
                  )}
                  {/* user logOut */}
                  <div
                    onMouseLeave={() => setSubMenu(false)}
                    className={`${
                      subMenu ? "flex flex-col justify-center" : "hidden"
                    } px-4 py-8 z-40 rounded-md w-[200px] text-gray-900 absolute top-12 -left-32 md:-left-24 bg-blue-200`}
                  >
                    <div className=" ">
                      <Link to={'/userProfile'}><button className="flex  cursor-pointer hover:underline hover:text-blue-700 gap-2 items-center justify-center"><span className=""><FaRegUser /></span>Update Profile</button></Link>
                      <Link to={'dashboard'}><button className="flex mt-2 cursor-pointer hover:underline hover:text-blue-700 gap-2 items-center justify-center"><span className=""><MdOutlineDashboardCustomize /></span>DashBoard</button></Link>
                    </div>
                    <div className="divider"></div>
                    <button
                     onClick={logOutHandler}
                     className="border flex gap-2 items-center justify-center cursor-pointer border-blue-300 py-1 px-2 rounded-md">
                      <span className="">
                        <FiLogOut />
                      </span>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSignIn(!sign)}
                  className="flex text-yellow-400 flex-col cursor-pointer justify-center items-center"
                >
                  <span className="text-2xl">
                    <FaRegUser />
                  </span>
                </button>
              )}
            </div>
          <Link to={"/cart"}>
            <button className="flex relative text-yellow-400 flex-col cursor-pointer justify-center items-center">
              <span className="text-2xl">
                <IoCartOutline />
              </span>
              <span className="bg-blue-800 rounded-full text-xl text-white absolute -top-2 right-0">
              {cartData?.length}
              </span>
            </button>
          </Link>
        </div>
        {/* sidebar SignIn */}
        <div
          className={`bg-white lg:hidden duration-700 px-6 py-10 shadow-2xl ${
            sign ? "fixed right-0 top-0" : "-right-[2000px] fixed top-0"
          }   z-[100] w-9/12 p-12 h-[100vh]`}
        >
          <div className="flex mb-12 items-center text-xl justify-between">
            <p className="font-semibold">Login</p>
            <p onClick={() => setSignIn(!sign)} className="cursor-pointer">
              <RxCross2 />
            </p>
          </div>
          {/* login Form */}
          <LoginFrom setSignIn={setSignIn} />
        </div>

        {/* sidebar MenuBar */}
        <div
          className={`bg-white lg:hidden duration-700 px-6 py-10 shadow-2xl ${
            menu ? "fixed left-0 top-0" : "-left-[1500px] fixed top-0"
          }   z-10 w-9/12 p-12 h-[100vh]`}
        >
          <div className="flex mb-12 items-center text-xl justify-between">
            <p className="font-semibold">
              <span className="italic">Shohoj</span>
              <span className="text-yellow-500">Mart+</span>
            </p>
            <p onClick={() => setMenu(!menu)} className="cursor-pointer">
              <RxCross2 />
            </p>
          </div>
          {/* Menu*/}
          <div className="">
            <ul onClick={() => setMenu(!menu)} className="flex flex-col gap-6 ">
              <NavLink to={"/"}>
                <li className="">Home</li>
              </NavLink>
              <NavLink to={"/collection"}>
                <li className="">Collection</li>
              </NavLink>
              <NavLink to={"/contact"}>
                <li className="">Contact</li>
              </NavLink>
              <NavLink to={"/help"}>
                <li className="">Help</li>
              </NavLink>
              <NavLink to={"/wishlist"}>
                <li className="">WishList</li>
              </NavLink>
              <NavLink to={"/offers"}>
                <li className="">Offers</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
