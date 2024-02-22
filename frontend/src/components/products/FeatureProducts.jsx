import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../Ratings";
import { useDispatch, useSelector } from "react-redux";
import { add_to_card, messageClear } from "../../store/reducers/cardReducer";
import { toast } from "react-hot-toast";

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div className="border group transition-all duration-500 hover:shadow-md " key={i}>
            <div className="relative overflow-hidden">
              {p.discount ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                  {p.discount}
                </div>
              ) : (
                ""
              )}

              <img className="sm:w-full w-full h-[240px]" src={`${p.images[0]}`} alt="product image" />
              <ul className="flex flex-col transition-all duration-500 justify-start items-start gap-2 ">
                <li
                  onClick={() => add_card(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-10  group-hover:left-5  transition-all duration-300"
                >
                  <AiOutlineShoppingCart />
                </li>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white absolute -left-10 top-[88px]  group-hover:left-5  transition-all duration-500">
                  <AiFillHeart />
                </li>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[136px] group-hover:left-5  transition-all duration-700">
                  <FaArrowsSpin />
                </li>
                <Link
                  to={`/product/details/${p.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[184px]  group-hover:left-5  transition-all duration-1000"
                >
                  <FaEye />
                </Link>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <h2>{p.name}</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg  font-bold">${p.price}</span>
                <div className="flex">
                  <Ratings ratings={p.rating} />
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
