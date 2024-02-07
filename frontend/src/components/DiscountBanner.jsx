import React from "react";
import save1 from "../assets/save1.jpg";
import save2 from "../assets/save2.jpg";

const DiscountBanner = () => {
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="grid grid-cols-2 bg-white shadow gap-5">
          <div>
            <img src={save1} alt="" />
          </div>
          <div>
            <img src={save2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
