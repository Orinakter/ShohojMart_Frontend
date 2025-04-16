import { useParams } from "react-router";
import useSingleProduct from "../../../hooks/useSingleProduct";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import toast from "react-hot-toast";
import imgUploads from "../../../api/imgUploads";
import LoaderSipnner from "../../common/LoaderSipnner";
import usePrivateServer from "../../../hooks/usePrivateServer";

const UpdateProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { product, productLoading, singleRefetch } = useSingleProduct(id);
  const [imgPath, setImgPath] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const date = new Date();
  const privateServer = usePrivateServer();

  useEffect(() => {
    if (imgPath) {
      const imageURL = URL.createObjectURL(imgPath);
      setImgPreview(imageURL);
      return () => URL.revokeObjectURL(imageURL);
    }
  }, [imgPath, setImgPreview]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        brandName: product.brandName || "",
        modelName: product.modelName || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        feature: product.feature || "",
        discount: product.discount || "",
        stock: product.stock || "",
        productCode: product.productCode || "",
      });
    }
  }, [product, reset]);

  const categoryArr = [
    "Mobile Phones",
    "Laptops Tablets",
    "Televisions",
    "PCs Accessories",
    "Audio Video",
    "Gaming Accessories",
    "Home Appliances",
    "Kitchen Appliances",
    "Cameras",
    "Consumables",
    "Smart Homes",
    "Accessories",
  ];
  const discountArr = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
  ];

  const submitHandler = async (formData) => {
    try {
      setLoading(true);
      const updateData = {
        ...formData,
        updateOn: date,
        image: imgPath ? await imgUploads(imgPath) : product?.image,
      };
      
      await privateServer.patch(`/product/${id}`, updateData)
      singleRefetch()
      setImgPath('')
      setLoading(false);
      toast.success('product Update SuccessFully')
    } catch (err) {
      setLoading(false)
      toast.error(err.message);
      
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center w-full">
      {productLoading ? (
        <LoaderSipnner />
      ) : (
        <div className="max-w-[1200px] w-full mx-auto rounded-md bg-white shadow-md p-6 md:p-10 lg:px-14">
          <h1 className="text-2xl text-center my-6 font-semibold">
            Update <span className="text-blue-800">{product?.title}</span>
          </h1>
          {/* form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-6"
          >
            {/* title and brand && model */}
            <div className="flex flex-col md:flex-row  justify-center items-center gap-6">
              {/* title */}
              <div className="flex flex-col gap-1 w-full">
                <label className="">Title</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="border rounded-sm w-full border-gray-400 py-2 px-3"
                />
              </div>
              {/* Brand */}
              <div className="flex flex-col gap-1 w-full">
                <label className="brandName">Brand Name</label>
                <input
                  type="text"
                  {...register("brandName", { required: true })}
                  className="border rounded-sm border-gray-400 py-2 px-3"
                />
              </div>
              {/* Model */}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Model Name</label>
                <input
                  type="text"
                  {...register("modelName", { required: true })}
                  className="border rounded-sm border-gray-400 py-2 px-3"
                />
              </div>
            </div>
            {/* description and Photo */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* description */}
              <div className="flex flex-col gap-1 w-full lg:w-8/12">
                <label className="">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  rows={4}
                  cols={10}
                  placeholder="Type Here"
                  className="border p-3 rounded-sm border-gray-400 w-full resize-none"
                ></textarea>
              </div>
              {/* Photo*/}
              <div className="flex flex-col gap-1 w-full lg:w-4/12 px-6 mt-7">
                {/* image Upload */}
                <div className="mb-6 w-full h-full">
                  <label className="uppercase">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImgPath(e.target.files[0])}
                    />
                    <div className="border-2 flex overflow-hidden w-full h-20 py-2 items-center gap-3 border-dashed border-blue-800 p-2 px-4 cursor-pointer">
                      {imgPreview ? (
                        <img src={imgPreview} alt="" className="w-32 h-20" />
                      ) : (
                        <span className="flex gap-2 items-center">
                          <span className="text-xl">
                            <FaImage />
                          </span>
                          Upload Photo
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* category && price && feature */}
            <div className="flex flex-col md:flex-row  justify-center items-center gap-6">
              {/* Category */}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="select w-full"
                >
                  {categoryArr.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {/* price */}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Price</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="border rounded-sm border-gray-400 py-2 px-3"
                />
              </div>
              {/* feature */}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Features</label>
                <input
                  type="text"
                  {...register("feature", { required: true })}
                  className="border rounded-sm border-gray-400 py-2 px-3"
                />
              </div>
            </div>
            {/* discount && stock && product code */}
            <div className="flex flex-col md:flex-row  justify-center items-center gap-6">
              {/* Category */}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Discount</label>
                <select
                  {...register("discount", { required: true })}
                  className="select w-full"
                >
                  {discountArr.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {/* price */}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Stock</label>
                <input
                  type="number"
                  {...register("stock", { required: true })}
                  className="border rounded-sm border-gray-400 py-2 px-3"
                />
              </div>
              {/* Product code*/}
              <div className="flex flex-col gap-1 w-full">
                <label className="modelName">Product Code</label>
                <input
                  type="text"
                  maxLength={6}
                  {...register("productCode", { required: true })}
                  className="border rounded-sm border-gray-400 py-2 px-3"
                />
              </div>
            </div>
            <input
              type="submit"
              value={`${loading ? "loading..." : "Save & Update"}`}
              disabled={loading}
              className={`${
                loading
                  ? "disabled:cursor-not-allowed hover:cursor-not-allowed"
                  : ""
              }w-full mt-6 font-medium cursor-pointer bg-blue-800 text-white py-2 px-4 rounded-sm`}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
