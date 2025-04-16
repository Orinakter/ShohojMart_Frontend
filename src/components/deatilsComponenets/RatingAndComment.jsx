import { useContext } from "react";
import Rating from "./Rating";
import { UtilitesContext } from "../../context/UtilitesProvider";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import usePublicServer from "../../hooks/usePublicServer";
import toast from "react-hot-toast";
import useReviews from "../../hooks/useReviews";

const RatingAndComment = ({ product, user }) => {
  const { rating, setSignIn } = useContext(UtilitesContext);
  const date = new Date();
  const { userData, userLoading } = useUser();
  const publicServer = usePublicServer();
  const { reviewFetch} = useReviews(product?._id)

  const reviewHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    if (!user) {
      return Swal.fire({
        title: "You Need Login First?",
        text: "You can't comment without login!",
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
    if (rating === 0) {
      return Swal.fire("please Give Rating!");
    }

    try {
      const reviewInfo = {
        rating,
        comment,
        date,
        name: userData?.name,
        email: userData?.email,
        productId: product?._id,
      };
      await publicServer.post(`/review`, reviewInfo);
      reviewFetch();
      toast.success("comment add SuccessFully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto mb-12">
      <form onSubmit={reviewHandler} className="">
        <div className="flex flex-col md:flex-row md:max-w-[1000px] mx-auto">
          {/* rating */}
          <div className="md:w-1/2 flex flex-col justify-center border border-gray-300 py-3 px-6">
            <p className="text-3xl mb-3 text-center text-gray-600">
              <span className="text-6xl text-yellow-600 font-semibold">
                {rating}
              </span>
              /5
            </p>
            <Rating />
          </div>
          {/* comment */}
          <div className="md:w-1/2 border border-gray-300 ">
            <textarea
              name="comment"
              required
              placeholder="Type Your Message here"
              className="w-full h-full resize-none p-4"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mt-6 md:max-w-[1000px] mx-auto">
          <input
            type="submit"
            value="Add Your Review"
            className="bg-blue-800 font-medium cursor-pointer w-full py-1 px-6 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default RatingAndComment;
