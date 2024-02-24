import React from "react";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";

const RatingSelector = ({ rating, onClick }) => (
  <div
    onClick={onClick}
    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
  >
    {[...Array(5)].map((_, index) => (
      <span key={index}>{index < rating ? <AiFillStar /> : <CiStar />}</span>
    ))}
  </div>
);

export default RatingSelector;
