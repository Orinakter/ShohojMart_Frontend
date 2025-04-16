import { useState } from "react";
import useMyOrder from "../../../hooks/useMyOrder";
import useSingleOrder from "../../../hooks/useSingleOrder";
import LoaderSipnner from "../../common/LoaderSipnner";
import { format, formatDistanceToNow } from "date-fns";
import { TbListDetails } from "react-icons/tb";

const MyOrder = () => {
  const { myOrder, myOrderLoading } = useMyOrder();
  const [productId, setProductId] = useState("");
  const { singleOrder } = useSingleOrder(productId);

  return (
    <div className="py-10 px-4">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-blue-50">
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th className="">Status</th>
              <th className="">Action</th>
            </tr>
          </thead>
          {myOrderLoading ? (
            <LoaderSipnner />
          ) : (
            <tbody>
              {/* row 1 */}
              {myOrder?.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.userEmail}</td>
                  <td>{format(new Date(item?.paymentDate), "dd MMM yyyy")}</td>
                  <td className="font-medium">
                    {formatDistanceToNow(new Date(item?.paymentDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="">
                    {item?.status === "pending" && (
                      <button className="w-[120px] py-1 px-4 font-medium bg-yellow-500 text-white rounded-full">
                        {item?.status}
                      </button>
                    )}
                    {item?.status === "cancel" && (
                      <button className="w-[120px] py-1 px-4 font-medium bg-red-600 text-white rounded-full">
                        {item?.status}
                      </button>
                    )}
                    {item?.status === "complete" && (
                      <button className="w-[120px] py-1 px-4 font-medium bg-green-600 text-white rounded-full">
                        Approved
                      </button>
                    )}
                    {item?.status === "delivered" && (
                      <button className="w-[120px] py-1 px-4 font-medium bg-black text-white rounded-full">
                        {item?.status}
                      </button>
                    )}
                  </td>
                  <td className="flex justify-between items-center gap-6">
                    <button
                      onClick={() => {
                        setProductId(item?._id);
                        document.getElementById("my_modal_5").showModal();
                      }}
                      className="text-2xl text-blue-700 cursor-pointer"
                    >
                      <TbListDetails />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* modal */}
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <div className="">
            <p className="text-center font-medium text-xl py-3">Ordered Item</p>
            {/* product */}
            <div className="flex flex-wrap gap-6">
              {singleOrder?.items?.map((item, idx) => (
                <p key={idx} className="">
                  <span className="font-semibold text-blue-600">
                    #{idx + 1}
                  </span>{" "}
                  {item}{" "}
                </p>
              ))}
            </div>
            <div className="divider"></div>
            <div className="">
              <p className="mb-2">
                <span className="font-semibold">Paid:</span>{" "}
                {singleOrder?.paidAmount}$
              </p>
              <p className="mb-2">
                <span className="font-semibold">TransactionId:</span>{" "}
                {singleOrder?.transactionId}
              </p>
              <p className="mb-2">
                <span className="font-semibold">District:</span>{" "}
                {singleOrder?.district}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {singleOrder?.address}
              </p>
              <p className="mb-6">
                <span className="font-semibold">Phone:</span>{" "}
                {singleOrder?.phone}
              </p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyOrder;
