import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import { FaArrowsSpin } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { add_to_card, add_to_compare, add_to_wishlist, messageClear } from "../../store/reducers/cardReducer";
import { toast } from "react-hot-toast";

const ShopProducts = ({ styles, products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage, comparelist_count } = useSelector((state) => state.card);
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

  const add_wishlist = (pro) => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: pro._id,
        name: pro.name,
        price: pro.price,
        image: pro.images[0],
        discount: pro.discount,
        rating: pro.rating,
        slug: pro.slug,
      })
    );
  };
  const add_compare = (pro) => {
    console.log(pro.colorArray);
    if (comparelist_count >= 4) {
      toast.error("Already Added Many Items");
    } else {
      dispatch(
        add_to_compare({
          userId: userInfo.id,
          productId: pro._id,
          name: pro.name,
          price: pro.price,
          image: pro.images[0],
          discount: pro.discount,
          rating: pro.rating,
          slug: pro.slug,
          colorArray: pro.colorArray,
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
  }, [errorMessage, successMessage]);
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 sm:grid-cols-1"
          : "grid-cols-1 md-lg:grid-cols-1 sm:grid-cols-1"
      } gap-3`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[240px] md:h-[270px] sm:h-[250px] xs:h-[190px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              onClick={() => navigate(`/product/details/${p.slug}`)}
              className="h-[240px] rounded md:h-[270px] sm:h-[250px] xs:h-[190px] w-full object-cover cursor-pointer"
              src={p.images[0]}
              alt="image"
            />
            <ul className="flex flex-col transition-all duration-500 justify-start items-start gap-2 ">
              <li
                onClick={() => add_card(p._id)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-6  group-hover:left-5  transition-all duration-300"
              >
                <AiOutlineShoppingCart />
              </li>
              <li
                onClick={() => add_wishlist(p)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white absolute -left-10 top-[70px]  group-hover:left-5  transition-all duration-500"
              >
                <AiFillHeart />
              </li>
              <li
                onClick={() => add_compare(p)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[116px] group-hover:left-5  transition-all duration-700"
              >
                <FaArrowsSpin />
              </li>
              <Link
                to={`/product/details/${p.slug}`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[162px] group-hover:left-5  transition-all duration-1000"
              >
                <FaEye />
              </Link>
            </ul>
          </div>
          <div
            onClick={() => navigate(`/product/details/${p.slug}`)}
            className="text-slate-600 px-2 w-full py-1 cursor-pointer"
          >
            <h2 className="text-md text-slate-700 font-medium">{p.name}</h2>
            <div className="flex justify-start items-center gap-2">
              <span className="text-md  font-bold text-slate-700">${p.price}</span>
              <div className="flex text-lg">
                <Ratings ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
