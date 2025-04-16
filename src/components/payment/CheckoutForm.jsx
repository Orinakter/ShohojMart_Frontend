import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePublicServer from "../../hooks/usePublicServer";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import usePrivateServer from "../../hooks/usePrivateServer";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const publicServer = usePublicServer();
  const privateServer = usePrivateServer();
  const { cartData, cartRefetch } = useCart();
  const subTotal = cartData?.reduce((acc, item) => acc + item?.netPrice, 0);
  const fee = cartData?.length > 0 ? 20 : 0;
  const total = subTotal + fee;
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const date = new Date();
  const navigate = useNavigate();
  const [district, setDistrict] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    publicServer
      .post(`/create-payment-intent`, { price: total })
      .then((res) => {
        setClientSecret(res?.data?.clientSecret);
      });
  }, [publicServer, total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    if(!district || !address || !phone){
      setLoading(false)
      return toast.error("Please Give delivery Information")
    }

    if (!stripe || !elements) {
      setLoading(false)
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setLoading(false)
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false)
      toast.error(error?.message);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.name,
          },
        },
      });
      console.log(paymentIntent)

    if (confirmError) {
      setLoading(false)
      Swal.fire({
        title: error.code,
        text: error.message,
        icon: "error",
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          name: user?.displayName,
          userEmail: user?.email,
          paidAmount: paymentIntent?.amount / 100,
          paymentDate: date,
          transactionId: paymentIntent.id,
          items: cartData?.map((item) => item?.title),
          status:'pending',
          itemsList: cartData?.map((item) => item?.porductId),
          district,
          address,
          phone

        };
        try {
          await privateServer.post(`/payment`, paymentInfo);
          await privateServer.delete(`/userCart/${user?.email}`);
          Swal.fire({
            title: "payment SuccessFully",
            text: `Transaction Id: ${paymentIntent.id}`,
            icon: "success",
          });
          cartRefetch();
          setLoading(false)
          navigate("/cart");
        } catch (err) {
          toast.error(err.message);
          setLoading(false)
        }
      }
    }
  };

  return (
    <div className="">
      <div className="py-10 ">
        <p className="text-xl mb-4 text-gray-600">Payable For {`(${cartData?.length})`} Item</p>
        <div className="">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
           <input
           onChange={(e)=> setDistrict(e.target.value)}
            type="text" placeholder="District" className="input w-full" />
           <input 
           onChange={(e)=> setAddress(e.target.value)}
           type="text" placeholder="Address" className="input w-full" />
          </div>
          <input 
          onChange={(e)=> setPhone(e.target.value)}
          type="phone" placeholder="Phone Number" className="input w-full" />
        </div>
        <div className="divider"></div>
        <p className=" flex text-xl text-gray-600 justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="font-semibold">{total}$</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "26px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="px-10 font-medium py-2 mt-8 w-full rounded-md bg-blue-700 text-white cursor-pointer"
          disabled={!stripe || !clientSecret || loading}
        >
         {
          loading?"Loading...":'Pay'
         }
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
