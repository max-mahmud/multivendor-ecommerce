import React from "react";

const ChangePassword = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-slate-600 uppercase">Change Password</h2>
      <div className="p-4 bg-slate-50  shadow-md md-lg:w-full w-[50%] mx-auto mt-10 md-lg:mt-3">
        <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>
        <form>
          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="old_password">Old Password</label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              placeholder="old password"
              className="outline-none px-3 py-1 border rounded text-slate-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="new_password">New Password</label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="new password"
              className="outline-none px-3 py-1 border rounded text-slate-600"
            />
          </div>
          <div>
            <button className="px-8 py-2 bg-emerald-500 shadow-lg hover:shadow-emerald-500/30 text-white rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
