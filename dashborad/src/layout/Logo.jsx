import React from "react";
import { SiInstacart } from "react-icons/si";

const Logo = () => {
  return (
    <>
      <div className="flex items-center gap-1 text-shadow">
        <span className="text-green-500 text-4xl">
          <SiInstacart />
        </span>
        <div className="flex flex-col text-[#868686]">
          <h2 className="text-3xl font-extrabold">ECOMREZ</h2>
          <span className="font-semibold text-xl -mt-3">S H O P N O W</span>
        </div>
      </div>
    </>
  );
};

export default Logo;
