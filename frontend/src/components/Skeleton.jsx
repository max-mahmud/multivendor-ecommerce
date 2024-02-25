import React from "react";

const Skeleton = ({ styles }) => {
  return (
    <>
      <div className={`bg-gray-400 animate-pulse flex justify-center items-center ${styles}`}></div>
    </>
  );
};

export default Skeleton;
