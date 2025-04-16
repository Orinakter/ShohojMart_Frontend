import React, { useEffect, useState } from "react";
import useProduct from "../../../hooks/useProduct";
import LoaderSipnner from "../../common/LoaderSipnner";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router";
import usePrivateServer from "../../../hooks/usePrivateServer";

const AllProduct = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [category, setCategory] = useState("");
  const { productData, isLoading, refetch } = useProduct(
    category === "All" ? "" : category, 0, 'recent'
  );
  const privateServer = usePrivateServer();

  const categoryArr = [
    "All",
    "Mobile Phones",
    "Laptops Tablets",
    "Televisions",
    "PCs Accessories",
    "Audio Video",
    "Gaming Accessories",
    "Home Appliances",
    "Kitchen Appliances",
    "Cameras",
    "Consumables",
    "Smart Homes",
    "Accessories",
  ];

   
  const handleDelete = async (id) => {
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
        const { data } = await privateServer.delete(`/deleteProduct/${id}`);
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
    <div className="px-2 py-6">
      {/* header */}
      <div className="py-4 flex flex-wrap justify-between items-center">
        <p className="text-xl font-semibold">Product: {productData?.length}</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="select outline-none"
        >
          {categoryArr.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-blue-100">
              <th>Sl</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Product Code</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <LoaderSipnner />
          ) : (
            <tbody>
              {/* row 1 */}
              {productData.map((item, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      src={item?.image}
                      alt={item?.title}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.category}</td>
                  <td>{item?.price} $</td>
                  <td>{item?.productCode}</td>
                  <td>{item?.stock}</td>
                  <td className="flex text-2xl items-center gap-4">
                    <Link to={`/dashboard/update-product/${item?._id}`}>
                      <button className="text-blue-800 cursor-pointer">
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="text-red-700 cursor-pointer"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
