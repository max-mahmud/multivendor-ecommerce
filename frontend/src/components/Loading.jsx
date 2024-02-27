import React from "react";
import { SiSpinrilla } from "react-icons/si";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000c7] z-50">
      <p className=" font-semibold  animate-spin text-white">
        <SiSpinrilla className="text-8xl" />
      </p>
    </div>
  );
};

export default Loading;
