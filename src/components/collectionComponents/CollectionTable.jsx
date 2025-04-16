import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";

const CollectionTable = ({ products }) => {
  const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Title</th>
              <th>Regular Price</th>
              <th>Offer Price</th>
              <th>Discount</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, idx) => (
              <motion.tr
                onClick={() => navigate(`/details/${item?._id}`)}
                key={idx}
                className="cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 10,
                  delay: idx * 0.05,
                }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <th>{idx + 1}</th>
                <td>
                  <img
                    src={item?.image}
                    alt=""
                    className="w-24 h-24 object-cover"
                  />
                </td>
                <td>{item?.title}</td>
                <th className="line-through">{item?.price}</th>
                <th className="text-yellow-700">
                  {(
                    parseFloat(item?.price) -
                    parseFloat(item?.price) *
                      (parseFloat(item?.discount) / 100)
                  ).toFixed(1)}
                </th>
                <th>{item?.discount}%</th>
                <th>
                  {item?.stock == 0 ? (
                    <span className="text-red-600">Out Of Stock</span>
                  ) : (
                    <span>{item?.stock} SKU</span>
                  )}
                </th>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionTable;
