import Mobile from "../../assets/categoryImg/mobile-phones.jpg";
import Laptops from "../../assets/categoryImg/laptops-tablets.jpg";
import Televisions from "../../assets/categoryImg/televisions.jpg";
import PcsAccessories from "../../assets/categoryImg/pcs-accessories.jpg";
import AudioVideo from "../../assets/categoryImg/audio-video.jpg";
import Gaming from "../../assets/categoryImg/gaming-accessories.jpg";
import HomeApplience from "../../assets/categoryImg/home-appliances.jpg";
import KitchenApplience from "../../assets/categoryImg/kitchen-appliances.jpg";
import Cameras from "../../assets/categoryImg/cameras.jpg";
import Consumables from "../../assets/categoryImg/consumables.jpg";
import SmartHomes from "../../assets/categoryImg/smart-homes.jpg";
import Accessories from "../../assets/categoryImg/accessories.jpg";
import { Link } from "react-router";
import CategoryCard from "../common/CategoryCard";
import { motion } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TopCategory = () => {
  const categories = [
    { logo: Mobile, name: "Mobile Phones" },
    { logo: Laptops, name: "Laptops Tablets" },
    { logo: Televisions, name: "Televisions" },
    { logo: PcsAccessories, name: "PCs Accessories" },
    { logo: AudioVideo, name: "Audio Video" },
    { logo: Gaming, name: "Gaming Accessories" },
    { logo: HomeApplience, name: "Home Appliances" },
    { logo: KitchenApplience, name: "Kitchen Appliances" },
    { logo: Cameras, name: "Cameras" },
    { logo: Consumables, name: "Consumables" },
    { logo: SmartHomes, name: "Smart Homes" },
    { logo: Accessories, name: "Accessories" },
  ];

  return (
    <motion.div
      className="container mx-auto"
      initial="hidden"
      whileInView="show"
      variants={containerVariants}
      viewport={{ once: false }}
    >
      {/* Header Section */}
      <div className="flex mb-6 justify-between">
        <p className=""></p>
        <h1 className="text-xl font-bold">Top Categories</h1>
        <Link to="/collection">
          <p className="underline hover:text-blue-700 cursor-pointer">
            Shop All
          </p>
        </Link>
      </div>

      {/* Category Cards with Motion */}
      <motion.div
        className="grid px-4 justify-items-center gap-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        variants={containerVariants}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CategoryCard logo={category.logo} name={category.name} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TopCategory;
