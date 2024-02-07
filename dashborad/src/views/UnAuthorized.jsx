import React from "react";

const UnAuthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-gray-50 p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-red-400">Unauthorized</h1>
        <p className="text-lg text-gray-600">
          You do not have the necessary permissions to access this page.
        </p>
      </div>
    </div>
  );
};

export default UnAuthorized;
