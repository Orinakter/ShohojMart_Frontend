import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SliderCard from "./SliderCard";
import { motion } from "framer-motion";

const Slider = ({ data, class1, class2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
    >
      <Swiper
        slidesPerView={2}
        spaceBetween={5}
        loop={true}
        navigation={{ nextEl: `.${class2}`, prevEl: `.${class1}` }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 5 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 15 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((item, index) => (
          <SwiperSlide className="pb-4" key={item?._id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <SliderCard product={item} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <motion.div
        className="flex justify-center gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${class1} text-xl cursor-pointer p-2 hover:text-white rounded-lg shadow-md hover:bg-blue-800 transition`}
        >
          <FaAngleLeft />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${class2} text-xl cursor-pointer p-2 hover:text-white rounded-lg shadow-md hover:bg-blue-800 transition`}
        >
          <FaAngleRight />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Slider;
