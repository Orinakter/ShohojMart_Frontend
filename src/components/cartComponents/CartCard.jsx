import React from "react";
import Card from "./Card";
import { RiDeleteBin2Fill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import usePrivateServer from "../../hooks/usePrivateServer";

const CartCard = ({ cartData, cartLoading, cartRefetch }) => {
  const { user } = useAuth();
  const privateServer = usePrivateServer();

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
          const { data } = await privateServer.delete(`/userCart/${user?.email}`);
          if (data?.deletedCount > 0) {
            cartRefetch();
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

  return (
    <div className="">
      <div className="flex justify-between items-center px-4 py-2 mb-6 bg-white">
        <p className="">Items: {cartData?.length}</p>
        <button
          onClick={() => deleteAllHandler()}
          className="flex font-medium items-center gap-1 cursor-pointer"
        >
          <span className="text-2xl text-red-600">
            <RiDeleteBin2Fill />
          </span>
          Delete All
        </button>
      </div>
      <div className="grid grid-cols-1 bg-white p-4 gap-2">
        {cartData?.map((item) => (
          <Card key={item?._id} item={item} cartRefetch={cartRefetch} />
        ))}
      </div>
    </div>
  );
};

export default CartCard;
