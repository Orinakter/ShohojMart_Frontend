import React from "react";
import { Link } from "react-router";

const CategoryCard = ({ logo, name }) => {
  return (
    <div>
      <Link to={`/collection?category=${name}`}>
        <div className="cursor-pointer group overflow-hidden ">
          <img
            src={logo}
            alt=""
            className="mb-3 duration-500 group-hover:scale-105"
          />
          <p className="text-center  group-hover:text-blue-700 group-hover:underline">
            {name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
