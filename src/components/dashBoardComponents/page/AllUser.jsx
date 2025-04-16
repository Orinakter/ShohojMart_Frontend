import React, { useEffect, useState } from "react";
import useAllUser from "../../../hooks/useAllUser";
import { RiDeleteBin2Fill } from "react-icons/ri";
import usePrivateServer from "../../../hooks/usePrivateServer";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format, formatDistanceToNow } from "date-fns";
import LoaderSipnner from "../../common/LoaderSipnner";
import noUserImage from '../../../assets/images/noUserImage.png'

const AllUser = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const privateServer = usePrivateServer();
  const [role, setRole] = useState("");

  const { allUserData, allUserLoading, refetch } = useAllUser(role);

  //   update user Role
  const changeUserRole = async (role, id) => {
    try {
      await privateServer.patch(`/updateUser/${id}`, { role: role });
      toast.success(`User Role Changed To ${role}`);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  //   delete user
  const deleteHandler = async (id) => {
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
        const { data } = await privateServer.delete(`/deleteUser/${id}`);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="px-6 py-10">
      {allUserLoading ? (
        <LoaderSipnner />
      ) : (
        <div className="">
          <div className="flex justify-between items-center py-2 px-4 mb-4 bg-white">
            <p className="font-medium ">All User: {allUserData?.length}</p>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="select max-w-40 select-primary"
            >
              <option value={""}>All</option>
              <option value={"user"}>User</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-blue-100">
                  <th>Sl</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                  <th>Member Since</th>
                  <th className="">Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUserData?.map((item, idx) => (
                  <tr>
                    <th>{idx + 1}</th>
                    <td className="">
                      <img src={item?.profile?item?.profile:noUserImage} alt="" className="w-10 h-10 rounded-full" />
                    </td>
                    <td>{item?.name}</td>
                    <td
                      className={`${
                        item?.email === import.meta.env.VITE_Host
                          ? "text-red-500 font-medium"
                          : ""
                      }`}
                    >
                      {item?.email === import.meta.env.VITE_Host
                        ? "Email ID has been Hidden"
                        : item?.email}
                    </td>
                    <td className="">
                      {format(new Date(item?.date), "dd MMM yyyy")}
                    </td>
                    <td>
                      <td>
                        {formatDistanceToNow(new Date(item?.date), {
                          addSuffix: true,
                        })}
                      </td>
                    </td>
                    <td className="">
                      {item?.role === "user" && (
                        <button className="py-1 font-medium rounded-full px-8 w-32 bg-blue-700 text-white">
                          {item?.role}
                        </button>
                      )}
                      {item?.role === "admin" &&
                        item?.email !== import.meta.env.VITE_Host && (
                          <button className="py-1 font-medium px-8 w-32 rounded-full bg-green-700 text-white">
                            {item?.role}
                          </button>
                        )}
                      {item?.email === import.meta.env.VITE_Host && (
                        <button className="py-1 font-medium px-8 w-32 rounded-full bg-black text-white">
                          Site Host
                        </button>
                      )}
                    </td>
                    <td className=" flex justify-center items-center gap-10">
                      <select
                        disabled={item?.email === import.meta.env.VITE_Host}
                        onChange={(e) =>
                          changeUserRole(e.target.value, item?._id)
                        }
                        className="select max-w-40 select-primary"
                      >
                        <option value={"user"}>Make User</option>
                        <option value={"admin"}>Make Admin</option>
                      </select>
                      {item?.email === import.meta.env.VITE_host ? (
                        ""
                      ) : (
                        <button
                          disabled={item?.email === import.meta.env.VITE_Host}
                          onClick={() => deleteHandler(item?._id)}
                          className={`text-2xl ${
                            item?.email === import.meta.env.VITE_Host
                              ? "text-black "
                              : "text-red-600 "
                          } p-2 rounded-md border border-white duration-300 
                   hover:border hover:border-red-600 cursor-pointer `}
                        >
                          <RiDeleteBin2Fill />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
