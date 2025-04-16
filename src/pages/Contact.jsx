import React, { useEffect } from "react";
import contactBannner from "../assets/images/contactUs.jpg";
import PageMargin from "../components/common/PageMargin";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <PageMargin />
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${contactBannner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="w-full flex justify-center p-8 md:p-14 lg:p-24 items-center min-h-screen"
      >
        <div className="bg-slate-100 py-20 flex gap-10 flex-col lg:flex-row container mx-auto">
          {/* img */}
          <div className="lg:w-1/2">
            <img src={contactBannner} alt="" className=" w-full h-full" />
          </div>
          {/* text */}
          <div className="lg:w-1/2 px-3 py-10">
            <h1 className="text-3xl font-bold mb-4">Get in Touch with Us</h1>
            <p className="text-gray-600 font-medium text-xl mb-10">
              We’d love to hear from you! Whether you have questions, feedback,
              or need assistance, our team is here to help. Reach out to us
              through the following channels.
            </p>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="">
              <div className="mb-4">
                <p className="text-xl font-bold mb-3">📍 Our Address</p>
                <p className="flex flex-col px-6">
                  <span className="">ShohojMart HQ</span>
                  <span className="">123 Business Street</span>
                  <span className="">Dhaka, Bangladesh</span>
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold mb-3">📞 Phone Number</p>
                <p className="px-6">+880 1771 814597</p>
              </div>
              <div className="">
                <p className="text-xl font-bold mb-3">📧 Email</p>
                <p className="px-6">hayderbd4290@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
