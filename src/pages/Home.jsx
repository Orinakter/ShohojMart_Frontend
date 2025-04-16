import React, { useEffect } from "react";
import Banner from "../components/homeComponents/Banner";
import InfoShiping from "../components/homeComponents/InfoShiping";
import Fetured from "../components/homeComponents/Fetured";
import SectionDivider from "../components/common/SectionDivider";
import TopCategory from "../components/homeComponents/TopCategory";
import RecentProduct from "../components/homeComponents/RecentProduct";
import TopPhones from "../components/homeComponents/TopPhones";
import banner2 from '../assets/images/home2Banner.webp'
import { Link } from "react-router";
import Televisons from "../components/homeComponents/Televisons";
import PageMargin from "../components/common/PageMargin";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <PageMargin/>
      <Banner></Banner>
      <InfoShiping></InfoShiping>
      <Fetured></Fetured>
      <SectionDivider />
      <RecentProduct/>
      <SectionDivider />
      <TopCategory />
      <SectionDivider />
      <TopPhones/>
      <SectionDivider />
      <div className="">
        <Link to={'/collection'}><img src={banner2} alt="" className="hover:scale-105 duration-500" /></Link>
      </div>
      <SectionDivider />
      <Televisons/>
      <SectionDivider />
    </div>
  );
};

export default Home;
