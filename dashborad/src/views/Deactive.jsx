import React from "react";

const Deactive = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-gray-100 p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-red-400">Deactivated</h1>
        <p className="text-lg text-gray-600">
          Your account has been deactivated. Please contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default Deactive;
