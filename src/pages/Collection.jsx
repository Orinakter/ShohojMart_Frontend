import React, { useEffect, useState } from "react";
import PageMargin from "../components/common/PageMargin";
import usePublicServer from "../hooks/usePublicServer";
import { useQuery } from "@tanstack/react-query";
import SliderCard from "../components/slider/SliderCard";
import LoaderSipnner from "../components/common/LoaderSipnner";
import NoData from "../components/common/NoData";
import { useLocation } from "react-router";
import { CiBoxList } from "react-icons/ci";
import { HiSquares2X2 } from "react-icons/hi2";
import CollectionTable from "../components/collectionComponents/CollectionTable";
import { HiDotsVertical } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";

const Collection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryData = queryParams.get("category");

  const publicServer = usePublicServer();
  const [category, setCategory] = useState(categoryData || "");
  const [page, setPage] = useState(1);
  const limit = 12;
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(true);
  const [aside, setAside] = useState(false);
  const [sort, setSort] = useState(0);

  const {
    data: allCollection,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllProduct", category, page, limit, search, sort],
    queryFn: async () => {
      const { data } = await publicServer.get(
        `/allCollection?category=${category}&page=${page}&limit=${limit}&search=${search}&sort=${sort}`
      );
      return data;
    },
  });

  const product = allCollection?.items;
  console.log(sort)

  return (
    <div className="mb-14">
      <PageMargin />
      <div className="flex gap-6 relative ">
        {/* aside desktop */}
        <div className="w-2/12 hidden lg:flex lg:flex-col px-4 py-8 bg-blue-100 min-h-[100vh]">
          <input
            type="text"
            name=""
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Product Name"
            className="w-full mb-4 border bg-white rounded-md border-gray-300 py-2 px-3"
          />
          <ul className="bg-white rounded-md w-full flex cursor-pointer flex-col gap-2 px-4 py-5">
            <li onClick={() => setCategory("")} className="">
              All Product
            </li>
            {categoryArr?.map((item, idx) => (
              <li
                onClick={() => {
                  setCategory(item)
                  setPage(1)
                }}
                key={idx}
                className={`${
                  item === category
                    ? "underline font-semibold text-blue-700"
                    : ""
                } hover:underline hover:text-blue-800`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* aside mobile */}
        <div className={`w-9/12 fixed z-20 duration-700 top-36 ${aside?'left-0':'left-[1500px]'} flex flex-col lg:hidden px-4 py-8 bg-blue-50 min-h-[100vh]`}>
           <p
           onClick={()=>setAside(false)}
            className="flex cursor-pointer text-3xl justify-end mb-4"><RxCrossCircled /></p>
          <input
            type="text"
            name=""
            onChange={(e) => setSearch(e.target.value)}
            onBlur={()=>setAside(false)}
            placeholder="Product Name"
            className="w-full mb-4 border bg-white rounded-md border-gray-300 py-2 px-3"
          />
          <ul
          onClick={()=>setAside(false)}
           className="bg-white rounded-md w-full flex cursor-pointer flex-col gap-2 px-4 py-5">
            <li onClick={() => setCategory("")} className="">
              All Product
            </li>
            {categoryArr?.map((item, idx) => (
              <li
                onClick={() => {
                  setCategory(item)
                  setPage(1)
                }}
                key={idx}
                className={`${
                  item === category
                    ? "underline font-semibold text-blue-700"
                    : ""
                } hover:underline hover:text-blue-800`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* content */}
        <div className="lg:w-10/12 w-full relative py-6 px-8">
          <div className="bg-blue-100 px-4 sticky top-0 z-10 lg:relative lg:top-0 py-2 mb-4 flex justify-between items-center">
            <h1 className="hidden md:block">
              <span className=" font-semibold">Total Items:</span>{" "}
              {allCollection?.totalItems}
            </h1>
            <p
            onClick={()=> setAside(true)}
             className="block text-3xl lg:hidden"><HiDotsVertical /></p>
            <div className="flex items-center gap-6">
              <select
                onChange={(e)=> setSort(e.target.value)}
                defaultValue="Pick a text editor"
                className="select select-primary"
              >
                <option value={0} selected>Sort By Price</option>
                <option value={1}>{"Low > High"}</option>
                <option value={-1}>{"High > Low"}</option>
              </select>
              <div className="flex cursor-pointer gap-4 items-center text-3xl">
                <span
                 onClick={()=>setDisplay(true)}
                 className={`${display&&'text-blue-700'}`}>
                  <HiSquares2X2 />
                </span>
                <span
                onClick={()=>setDisplay(false)}
                 className={`${display ||'text-blue-700'}`}>
                  <CiBoxList />
                </span>
              </div>
            </div>
          </div>
          {product?.length === 0 ? (
            <div className="min-h-[70vh]">
              <NoData />
            </div>
          ) : (
            <div className="min-h-[70vh]">
              {isLoading ? (
                <LoaderSipnner />
              ) : (
                <div className="">
                  {
                    display?<div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {product?.map((item) => (
                     <SliderCard key={item?._id} product={item} />
                    ))}
                  </div>:
                  <CollectionTable products={product}/>
                  }
                </div>
              )}
            </div>
          )}
          {/* pagination  */}
          <div className="flex mt-10 justify-center space-x-4">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo(0, 0);
              }}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-800 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {allCollection?.totalPages}
            </span>
            <button
              onClick={() => {
                setPage((prev) =>
                  prev < allCollection?.totalPages ? prev + 1 : prev
                );
                window.scrollTo(0, 0);
              }}
              disabled={page === allCollection?.totalPages}
              className="px-8 py-2 bg-blue-800 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
