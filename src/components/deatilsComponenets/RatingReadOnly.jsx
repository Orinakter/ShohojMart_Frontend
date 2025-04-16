import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const RatingReadOnly = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= rating;
        return (
          <div key={starIndex} className="text-2xl">
            {isFilled ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingReadOnly;
