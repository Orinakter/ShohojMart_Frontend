import React, { useContext, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { UtilitesContext } from "../../context/UtilitesProvider";

const Rating = ({ maxStars = 5}) => {
  const [hovered, setHovered] = useState(null);
  const {rating, setRating} = useContext(UtilitesContext);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    setRating(index);
  };
  

  return (
    <div className="flex justify-center items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= (hovered || rating);
        return (
          <div
            key={starIndex}
            className="cursor-pointer text-4xl transition-all duration-200"
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          >
            {isFilled ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-500" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
