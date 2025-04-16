import { AiOutlineProduct } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { RiApps2AddLine } from "react-icons/ri";
import { Link } from "react-router";
import useUser from "../../hooks/useUser";
import { IoHome } from "react-icons/io5";
import { MdCollections } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import LoaderSipnner from "../common/LoaderSipnner";

const DashBoardAside = () => {
  const { userData, userLoading } = useUser();
  return (
    <div>
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">
          <span className="italic">shohoj</span>
          <span className="text-yellow-400">Mart+</span>
        </h1>
      </Link>
      <div className="border-b mt-4 mb-6 border-gray-300"></div>
      {/* nav-menu */}
      {userLoading ? (
        <LoaderSipnner />
      ) : (
        <div className="">
          {userData?.role === "admin" ? (
            // admin route---------------
            <div className="">
              <Link to={"add-product"}>
                <button className="flex hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
                  <span className="text-xl">
                    <RiApps2AddLine />
                  </span>
                  Add Product
                </button>
              </Link>
              <Link to={"all-product"}>
                <button className="flex mt-4 hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
                  <span className="text-xl">
                    <AiOutlineProduct />
                  </span>
                  All Product
                </button>
              </Link>
              <Link to={"all-user"}>
                <button className="flex mt-4 hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
                  <span className="text-xl">
                    <FaUserGroup />
                  </span>
                  Manage User
                </button>
              </Link>
              <Link to={"all-order"}>
                <button className="flex mt-4 hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
                  <span className="text-xl">
                    <FaBoxOpen />
                  </span>
                  Order History
                </button>
              </Link>
            </div>
          ) : (
            // user Route-------------
            <div className="">
              <Link to={"my-order"}>
                <button className="flex mt-4 hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
                  <span className="text-xl">
                    <HiOutlineClipboardList />
                  </span>
                  My Order
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      {/* common Route */}
      <div className="border-b mt-40 mb-6 border-gray-300"></div>
      <div className="flex flex-col gap-4">
        <Link to={"/"}>
          <button className="flex hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
            <span className="text-xl">
              <IoHome />
            </span>
            Home
          </button>
        </Link>

        <Link to={"/collection"}>
          <button className="flex hover:underline font-medium hover:text-yellow-300 cursor-pointer items-center gap-2">
            <span className="text-xl">
              <MdCollections />
            </span>
            Collection
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashBoardAside;
