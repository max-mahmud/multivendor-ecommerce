import React from "react";

const Pending = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-gray-50 p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Pending</h1>
        <p className="text-lg text-gray-600">Your request is pending. Please wait for further processing.</p>
      </div>
    </div>
  );
};

export default Pending;
