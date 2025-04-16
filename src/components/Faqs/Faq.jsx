import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const faqs = [
  {
    id: 1,
    question: "What is Shohoj Mart Electronics?",
    answer:
      "Shohoj Mart Electronics is your trusted online supershop for authentic electronics products including mobiles, laptops, home appliances, accessories, and more – all at affordable prices with fast delivery.",
  },
  {
    id: 2,
    question: "Are all the products original?",
    answer:
      "Yes, all our products are 100% original and sourced from verified brands and suppliers. We ensure authenticity and quality with every purchase.",
  },
  {
    id: 3,
    question: "How can I place an order?",
    answer:
      "Simply browse our website, add your desired items to the cart, and proceed to checkout. You’ll receive a confirmation message once the order is placed.",
  },
  {
    id: 4,
    question: "Do you offer home delivery?",
    answer:
      "Yes, we provide fast and reliable home delivery service across the country. Delivery time may vary based on your location.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, Rocket, Debit/Credit Cards, and Cash on Delivery (COD) in selected areas.",
  },
  {
    id: 6,
    question: "Can I return a product?",
    answer:
      "Yes, if the product is damaged, defective, or not as described, you can request a return within 3 days of delivery.",
  },
  {
    id: 7,
    question: "Do your products come with a warranty?",
    answer:
      "Yes, most electronics items come with a brand or seller warranty. Warranty details are mentioned on the product page.",
  },
  {
    id: 8,
    question: "How can I contact customer service?",
    answer:
      "You can reach us via our contact page, email us at support@shohojmart.com, or call our helpline at 01234-567890.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="max-w-[800px] mx-auto mt-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          className="border-y border-gray-300 p-4 mb-3 rounded-lg shadow-sm bg-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, delay: index * 0.1 },
          }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center gap-4">
              <motion.span
                className="text-blue-500 font-bold text-lg"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                {String(index + 1).padStart(2, "0")}.
              </motion.span>
              <h3
                className={`text-lg font-semibold transition-all ${
                  openIndex === index ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {faq.question}
              </h3>
            </div>
            <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
              {openIndex === index ? (
                <RxCross2 className="text-blue-600 text-xl" />
              ) : (
                <FaPlus className="text-gray-500 text-lg" />
              )}
            </motion.div>
          </div>

          {openIndex === index && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-2 text-gray-600 leading-relaxed overflow-hidden"
            >
              {faq.answer}
            </motion.p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Faq;
