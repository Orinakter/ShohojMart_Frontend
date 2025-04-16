import { useEffect } from "react";
import useWishList from "../hooks/useWishList";
import PageMargin from "../components/common/PageMargin";
import WishCard from "../components/wishComponenets/WishCard";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdShoppingCartCheckout } from "react-icons/md";
import LoaderSipnner from "../components/common/LoaderSipnner";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import usePrivateServer from "../hooks/usePrivateServer";

const WishList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { wishData, wishLoading, wishRefetch } = useWishList();
  const {user} = useAuth();
  const privateServer = usePrivateServer();
  const { cartRefetch} = useCart()

  const deleteAllHandler = () => {
    try {
      Swal.fire({
        title: ` Remove All Item From Cart?`,
        text: "Are You Sure!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete All!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await privateServer.delete(`/userWish/${user?.email}`);
          if (data?.deletedCount > 0) {
            wishRefetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };


  const addAllToCart = async() =>{
    const updatedWishData = wishData?.map(({ _id, ...rest }) => rest);
    await privateServer.post(`/carts`, updatedWishData); 
    await privateServer.delete(`/userWish/${user?.email}`);
    wishRefetch();
    cartRefetch();
    toast.success('All Item Moved To Cart')
  }


  return (
    <div className="bg-gray-50">
      <PageMargin />
      {wishLoading ? (
        <LoaderSipnner />
      ) : (
        <div className="lg:max-w-[1200px] p-4 lg:p-12 mx-auto">
          <h1 className="text-4xl mb-8 font-medium">My Wishlist</h1>
          {wishData?.length === 0 ? (
            <div className="">
              <h1 className="text-3xl font-bold py-8 text-center">
                No Wish Data Found
              </h1>
            </div>
          ) : (
            <div className="bg-white px-4 py-3 mb-8 flex items-center justify-between">
              <button
              onClick={addAllToCart}
               className="text-blue-800 font-semibold flex items-center gap-1 cursor-pointer">
                Add All To Cart
                <span className="text-2xl">
                  <MdShoppingCartCheckout />
                </span>
              </button>
              <button
               onClick={deleteAllHandler}
               className="flex font-medium items-center gap-1 cursor-pointer">
                <span className="text-2xl text-red-600">
                  <RiDeleteBin2Fill />
                </span>
                Delete All
              </button>
            </div>
          )}
          {/* wish card */}
          <div className="">
            <WishCard
              wishData={wishData}
              wishRefetch={wishRefetch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
