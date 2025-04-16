import toast from "react-hot-toast";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import usePrivateServer from "../../hooks/usePrivateServer";

const Card = ({ item, cartRefetch }) => {
  const privateServer = usePrivateServer();

  const deleteHandler = (id) => {
    try {
      Swal.fire({
        title: `${item?.title} Remove From Cart?`,
        text: "Are You Sure!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
        const {data} =  await privateServer.delete(`/cart/${id}`);
        if(data?.deletedCount>0){
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
    <div className="p-4 border flex items-center border-gray-300">
      {/* image, content */}
      <div className="w-11/12 flex flex-wrap items-center">
        <div className="w-2/12">
          <img src={item?.image} alt="" className="w-20 h-24 object-cover" />
        </div>
        {/* content */}
        <div className="w-9/12 lg:w-7/12">
          <p className="font-semibold mb-1">{item?.title}</p>
          <p className="text-sm">{item?.description.slice(0, 50)} ...</p>
          <p className="">
            <span className="font-semibold">Brand:</span> {item?.brand}
          </p>
        </div>
        {/* price */}
        <div className="w-3/12 hidden lg:flex lg:flex-col">
          <p className="text-xl text-yellow-600 font-semibold mb-1">
            {item?.netPrice}$
          </p>
          <p className="line-through font-medium">{item?.price}$</p>
        </div>
      </div>
      {/* button */}
      <div className="w-1/12">
        <button
          onClick={() => deleteHandler(item?._id)}
          className="text-2xl text-red-600 cursor-pointer"
        >
          <RiDeleteBin2Fill />
        </button>
      </div>
    </div>
  );
};

export default Card;
