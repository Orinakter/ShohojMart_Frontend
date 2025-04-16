import { useEffect } from "react";
import DashBoardFrom from "../DashBoardFrom";

const AddProduct = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  const categoryArr = [
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
  const discountArr = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
  ];

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <DashBoardFrom categoryArr={categoryArr} discountArr={discountArr} />
    </div>
  );
};

export default AddProduct;
