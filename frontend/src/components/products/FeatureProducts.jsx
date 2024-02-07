import React from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";
import img1 from "../../assets/45.jpg";

const FeatureProducts = () => {
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {[1, 2, 3, 4, 5, 6, 7].map((p, i) => (
          <div className="border group transition-all duration-500 hover:shadow-md ">
            <div className="relative overflow-hidden">
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                6%
              </div>
              <img className="sm:w-full w-full h-[240px]" src={`${img1}`} alt="product image" />
              <ul className="flex flex-col transition-all duration-500 justify-start items-start gap-2 ">
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-10  group-hover:left-5  transition-all duration-300">
                  <AiOutlineShoppingCart />
                </li>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white absolute -left-10 top-[88px]  group-hover:left-5  transition-all duration-500">
                  <AiFillHeart />
                </li>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[136px] group-hover:left-5  transition-all duration-700">
                  <FaArrowsSpin />
                </li>
                <Link
                  to="/product/details/dsfdsf"
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[184px]  group-hover:left-5  transition-all duration-1000"
                >
                  <FaEye />
                </Link>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <h2>Long Sleeve casua Shirt for Man</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg  font-bold">$675</span>
                <div className="flex">
                  <Ratings ratings={4.5} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
