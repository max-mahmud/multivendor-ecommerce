import React from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-200">
      <GridLoader color="#36D7B7" size={24} margin={2} />
    </div>
  );
};

export default Loading;
