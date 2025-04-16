import { FaShippingFast } from "react-icons/fa"
import { GiTrophy } from "react-icons/gi"
import { SlBadge } from "react-icons/sl"


const InfoShiping = () => {
  return (
    <div>
        <div className="bg-yellow-400 py-2 px-4">
          <p className="text-center font-semibold">BUY NOW, PAY LATER STARTING AT 0% APR</p>
        </div>
        <div className="hidden lg:flex justify-center max-w-[1200px] mx-auto p-4">
            <button className="flex items-center gap-6 border-r-2 px-5">
                <span className="text-2xl"><FaShippingFast /></span>
                <span className="">Free Shipping & Returns</span>
            </button>
            <button className="flex items-center gap-6 border-r-2 px-5">
                <span className="text-2xl"><SlBadge /></span>
                <span className="">Lowest Price Guarantee</span>
            </button>
            <button className="flex items-center gap-6  px-5">
                <span className="text-2xl"><GiTrophy /></span>
                <span className="">Longest Warranties Offer</span>
            </button>
        </div>
    </div>
  )
}

export default InfoShiping