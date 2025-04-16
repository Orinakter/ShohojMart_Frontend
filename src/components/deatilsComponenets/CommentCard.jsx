import { motion } from "framer-motion";
import RatingReadOnly from "./RatingReadOnly";
import { format, formatDistanceToNow } from "date-fns";

const CommentCard = ({ item }) => {
  const formattedDate = item?.date
    ? format(new Date(item?.date), "dd MMM yyyy HH:mm")
    : "";

  // Animation configuration
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="border-y py-6 px-4 border-gray-300"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* rating and date */}
      <div className="flex mb-4 items-center justify-between">
        <RatingReadOnly rating={item?.rating} />
        <p>{formattedDate}</p>
      </div>
      <p className="flex mb-3 items-center gap-2">
        <span className="p-2 rounded-full bg-gray-200 font-semibold">
          {item?.name.slice(0, 2).toUpperCase()}
        </span>
        <span className="">{item?.name}</span>
      </p>
      <div className="flex justify-between items-center">
        <p className="">{item?.comment}</p>
        <p className="text-sm font-medium text-blue-700">
          {formatDistanceToNow(new Date(item?.date), { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  );
};

export default CommentCard;
