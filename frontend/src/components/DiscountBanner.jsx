import React from "react";
import save1 from "../assets/save1.jpg";
import save2 from "../assets/save2.jpg";
import { useNavigate } from "react-router-dom";

const DiscountBanner = ({ link1, link2 }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-1 bg-slate-100 shadow gap-5">
          <div>
            <img
              onClick={() => navigate(`/product/details/${link1}`)}
              src={save1}
              alt="img"
              className="cursor-pointer h-[180px]"
            />
          </div>
          <div>
            <img
              onClick={() => navigate(`/product/details/${link2}`)}
              src={save2}
              alt="img"
              className="cursor-pointer h-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
