import { useEffect } from "react";
import PageMargin from "../components/common/PageMargin";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/payment/CheckoutForm";
import banner from '../assets/images/stripe.webp'

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK_Key);

const Payment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <PageMargin />
      <div className="lg:max-w-[1400px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-6">
        {/* image */}
      <div className="w-full md:w-1/2 border-r border-gray-200">
         <img src={banner} alt="" className="" />
        </div>
        {/* stripe from */}
      <div className="w-full md:w-1/2 py-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      
      </div>
    </div>
  );
};

export default Payment;
