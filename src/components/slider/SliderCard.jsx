import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const SliderCard = ({ product }) => {
  const discount =
    parseFloat(product?.price) * (parseFloat(product?.discount) / 100);

  return (
    <Link to={`/details/${product?._id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 8px 18px rgba(0, 102, 255, 0.3)",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full relative p-4 rounded-md shadow-md flex flex-col h-[450px] bg-white overflow-hidden"
      >
        {/* Image Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="mb-3"
        >
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-md"
          />
        </motion.div>

        {/* Content Section */}
        <div className="flex h-full flex-col">
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="text-md font-semibold flex-grow"
          >
            {product?.title}
          </motion.p>

          {/* Price Section */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="mt-auto"
          >
            <p className="flex gap-4 items-center">
              <span className="text-2xl font-semibold text-yellow-700">
                {product?.price && product?.discount
                  ? (parseFloat(product?.price) - discount).toFixed(2)
                  : product?.price}
                $
              </span>
              <span className="line-through text-xl text-gray-500">
                {product?.price}$
              </span>
            </p>
          </motion.div>
        </div>

        {/* Floating Discount Badge */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          }}
          className="bg-yellow-700 absolute top-4 right-4 z-10 font-semibold px-6 text-white rounded-lg shadow-lg"
        >
          <p className="text-sm flex gap-2 items-center">
            Save: {discount.toFixed(1)}$
            <span className="text-base">-{product?.discount}%</span> Off
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default SliderCard;
