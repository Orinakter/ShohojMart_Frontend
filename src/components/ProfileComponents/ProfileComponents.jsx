import { format, formatDistanceToNow } from "date-fns";
import noImage from "../../assets/images/noPhoto2.jpg";
import { RxCross2 } from "react-icons/rx";
import usePrivateServer from "../../hooks/usePrivateServer";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ProfileComponents = ({ item, user, galleryRefetch }) => {
  const privateServer = usePrivateServer();

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await privateServer.delete(`/gallery/${id}`);
        if (data?.deletedCount > 0) {
          galleryRefetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
        console.log(data);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="bg-gray-100 rounded-md p-4 w-full">
        {/* user content */}
        <div className="flex gap-3 mb-6 items-center w-full">
          <img
            src={user?.profile ? user?.profile : noImage}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="mb-2 w-full">
            <div className="flex items-center justify-between">
              <p className="">
                <span className="text-xl font-semibold">{user?.name}</span>{" "}
                Update {item?.status} Picture
              </p>

              <button onClick={() => deleteHandler(item?._id)} className="cursor-pointer p-2">
                <RxCross2 />
              </button>
            </div>
            <p className="flex text-gray-500 gap-14 items-center">
              <span>{format(new Date(item?.date), "dd MMM yyyy")}</span>
              <span>
                {formatDistanceToNow(new Date(item?.date), {
                  addSuffix: true,
                })}
              </span>
            </p>
          </div>
        </div>
        {/* image */}
        <div className="">
          <img
            src={item?.image}
            alt=""
            className="w-full object-fill h-[350px] md:h-[420px] lg:h-[550px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileComponents;
