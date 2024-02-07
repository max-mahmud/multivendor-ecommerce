import React from "react";
import brand1 from "../assets/brand1.jpg";
import brand2 from "../assets/brand2.jpg";
import brand3 from "../assets/brand3.jpg";
import brand4 from "../assets/brand4.jpg";
import brand5 from "../assets/brand5.jpg";
import brand6 from "../assets/brand6.jpg";
import brand7 from "../assets/brand7.jpg";

const Brands = () => {
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="grid grid-cols-6 bg-white shadow">
          {[brand1, brand2, brand4, brand5, brand3, brand7].map((item, i) => (
            <div key={i} className="border py-2">
              <img src={`${item}`} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
