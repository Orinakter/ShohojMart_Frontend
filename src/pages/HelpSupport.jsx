import React, { useEffect } from "react";
import PageMargin from "../components/common/PageMargin";
import Faq from "../components/Faqs/Faq";

const HelpSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <PageMargin />
      <div className="container mx-auto py-10">
        <h1 className="text-center text-3xl md:text-5xl mb-10 lg:mb-12 font-bold text-[#0A2C8C]">
          Frequently Asked Questions
        </h1>
        <div className="px-4">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
