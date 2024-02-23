import React, { useEffect } from "react";
import Ratings from "../Ratings";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  add_to_card,
  get_wishlist_products,
  messageClear,
  remove_wishlist,
} from "../../store/reducers/cardReducer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlist, successMessage, errorMessage } = useSelector((state) => state.card);
  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, []);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
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
  }, [successMessage, errorMessage]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-slate-600 uppercase">Wishlist</h2>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {wishlist.map((p, i) => (
          <div className="border group transition-all duration-500 hover:shadow-md " key={i}>
            <div className="relative overflow-hidden">
              {p.discount ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                  {p.discount}
                </div>
              ) : (
                ""
              )}

              <img className="sm:w-full w-full h-[240px]" src={`${p.image}`} alt="product image" />
              <ul className="flex flex-col transition-all duration-500 justify-start items-start gap-2 ">
                <li
                  onClick={() => add_card(p.productId)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-10  group-hover:left-5  transition-all duration-300"
                >
                  <AiOutlineShoppingCart />
                </li>
                <li
                  onClick={() => dispatch(remove_wishlist(p._id))}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white absolute -left-10 top-[88px]  group-hover:left-5  transition-all duration-500"
                >
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
    </>
  );
};

export default Wishlist;
