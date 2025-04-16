import { FaRegHeart } from "react-icons/fa";
import LoaderSipnner from "../common/LoaderSipnner";
import { BsCartPlus } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { UtilitesContext } from "../../context/UtilitesProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";
import usePrivateServer from "../../hooks/usePrivateServer";
// import useWishList from "../../hooks/useWishList";

const DetailsContent = ({ product, discount, productLoading }) => {
  const { user } = useAuth();
  const { setSignIn } = useContext(UtilitesContext);
  const privateServer = usePrivateServer();
  const { cartRefetch} = useCart();
  // const { wishRefetch} = useWishList()

  const itemInfo = {
    userEmail: user?.email,
    porductId: product?._id,
    title: product?.title,
    brand: product?.brandName,
    description: product?.description,
    price: parseInt(product?.price),
    discount: parseInt(product?.discount),
    image: product?.image,
    netPrice: parseFloat(parseFloat(product?.price - discount).toFixed(2)),
  };

  // post cart data
  const addCartHandler = async () => {
    if (!user) {
      return Swal.fire({
        title: "You Need Login First?",
        text: "You can't Add Cart without login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I Want!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSignIn(true);
        }
      });
    }

    try {
      
      await privateServer.post(`/cart`, itemInfo);
      toast.success(`${product?.title} add To Cart`);
      cartRefetch();
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      toast.error(message);
    }
  };


// post wish data
  const addwishHandler = async () => {
    if (!user) {
      return Swal.fire({
        title: "You Need Login First?",
        text: "You can't add Wishlist without login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I Want!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSignIn(true);
        }
      });
    }

    try {
      await privateServer.post(`/wishlist`, itemInfo);
      toast.success(`${product?.title} add To WishList`);
      // wishRefetch();
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      toast.error(message);
    }
  };

  return (
    <div>
      {productLoading ? (
        <LoaderSipnner />
      ) : (
        <div className="flex flex-col gap-10 lg:flex-row  lg:max-w-[1200px] mx-auto">
          {/* image */}
          <div className="w-full lg:w-1/2 py-6">
            <img src={product?.image} alt="" className="" />
          </div>
          {/* content */}
          <div className="w-full lg:w-1/2 py-6">
            <h1 className="text-3xl font-semibold mb-4">{product?.title}</h1>
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <button className=" px-6 text-yellow-600 py-2 font-semibold bg-gray-200 rounded-full">
                Offer Price:{" "}
                <span className="">{product?.price - discount}</span>$
              </button>
              <button className=" px-6 py-2 font-semibold bg-gray-200 rounded-full">
                Save:{" "}
                <span className="text-yellow-600">{discount.toFixed(1)}$ </span>
                From {product?.discount}% OFF
              </button>
              <button className=" px-6 py-2 font-semibold bg-gray-200 rounded-full">
                Regular Price:{" "}
                <span className="line-through">{product?.price}</span>$
              </button>
            </div>
            <p className="mb-3">{product?.description}</p>
            <div className="flex justify-between items-center mb-4">
              <p className="">
                <span className="font-semibold">Brand:</span>{" "}
                {product?.brandName}
              </p>
              <p className="">
                <span className="font-semibold">Model:</span>{" "}
                {product?.modelName}
              </p>
            </div>
            <p className="mb-4">
              <span className="font-semibold">Product Code:</span>{" "}
              {product?.productCode}
            </p>
            <p className="">
              <span className="font-semibold">Feature:</span> {product?.feature}
            </p>
            <button className="mt-8">
              {parseInt(product?.stock) > 0 ? (
                <span className="bg-green-600 rounded-full text-white px-8 py-1 text-xl font-semibold">
                  In Stock
                </span>
              ) : (
                <span className="bg-orange-600 rounded-full text-white px-8 py-1 text-xl font-semibold">
                  Out Of Stock
                </span>
              )}
            </button>
            <div className="divider"></div>
            {/* cart */}
            <div className="mt-6 flex gap-4 items-center">
              {parseInt(product?.stock) ? (
                <button
                  onClick={addCartHandler}
                  className="py-2 px-10 flex items-center gap-2 cursor-pointer bg-blue-800 text-white font-medium rounded-full"
                >
                  Add To Cart{" "}
                  <span className="text-xl">
                    <BsCartPlus />
                  </span>
                </button>
              ) : (
                ""
              )}
              <button
              onClick={addwishHandler}
               className="text-3xl hover:text-yellow-600 cursor-pointer">
                <FaRegHeart />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsContent;
