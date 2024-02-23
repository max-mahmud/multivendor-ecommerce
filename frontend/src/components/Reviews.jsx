import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import { AiFillStar } from "react-icons/ai";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customer_review, get_product, get_reviews, messageClear } from "../store/reducers/homeReducer";
import { toast } from "react-hot-toast";

const Reviews = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, reviews, totalReview, rating_review } = useSelector((state) => state.home);
  const [perPage, setPerPage] = useState(5);

  const [rat, setRat] = useState("");
  const [reviewText, setReviewText] = useState("");

  const review_submit = (e) => {
    e.preventDefault();

    if (!rat) {
      return toast.error("Rating is Must");
    }
    const obj = {
      userId: userInfo.id,
      name: userInfo.name,
      review: reviewText,
      rating: rat,
      productId: product._id,
    };
    dispatch(customer_review(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(
        get_reviews({
          productId: product._id,
          perPage,
        })
      );
      dispatch(get_product(product.slug));
      setRat("");
      setReviewText("");
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(
        get_reviews({
          productId: product._id,
          perPage,
        })
      );
    }
  }, [perPage, product]);

  const result = (num) => {
    let ans;
    if (totalReview !== 0) {
      ans = Math.floor((100 * (rating_review[num]?.sum || 0)) / totalReview);
    } else {
      ans = 0;
    }
    return ans;
  };

  return (
    <div className="mt-8">
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">{product.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-4xl">
            <Ratings ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">{totalReview} Reviews</p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          {[5, 4, 3, 2, 1, 0].map((rating, index) => (
            <div key={rating} className="flex justify-start items-center gap-5">
              <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={rating} />
              </div>
              <div className="w-[200px] h-[14px] bg-slate-200 relative">
                <div style={{ width: `${result(index)}%` }} className="h-full bg-[#EDBB0E]"></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">{rating_review[index]?.sum || 0}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">Products Reviews {totalReview}</h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1 bg-slate-100 p-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-xl font-bold uppercase">{r.name}</span>
              <span className="text-slate-600">{r.date}</span>
            </div>
            <div className="flex gap-1 text-xl py-1">
              <RatingTemp rating={r.rating} />
            </div>
            <p className="text-slate-600 text-sm">{r.review}</p>
          </div>
        ))}
        {totalReview > 5 && (
          <div className="flex justify-end">
            <button
              onClick={() => setPerPage(perPage + 5)}
              className="bg-emerald-500 text-white font-semibold px-5 py-1.5 rounded hover:bg-emerald-600"
            >
              More Reviews
            </button>
          </div>
        )}
      </div>
      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDBB0E] text-4xl">
                    <AiFillStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={review_submit}>
              <textarea
                value={reviewText}
                required
                onChange={(e) => setReviewText(e.target.value)}
                className="border outline-0 p-3 w-full bg-slate-50"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <div className="mt-2">
                <button className="py-1 px-5 bg-orange-500 font-medium text-white rounded-sm">Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link className="py-1 px-5 bg-orange-500 font-medium text-white rounded-sm" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
