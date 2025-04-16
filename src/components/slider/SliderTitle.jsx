import React from "react";
import { Link } from "react-router";

const SliderTitle = ({title}) => {
  return (
    <div>
      <div className="flex justify-between py-4">
        <p className="text-3xl text-yellow-600 font-semibold">{title}</p>
        <Link to={'/collection'}><button className="underline cursor-pointer hover:text-blue-700">See All</button></Link>
      </div>
    </div>
  );
};

export default SliderTitle;
