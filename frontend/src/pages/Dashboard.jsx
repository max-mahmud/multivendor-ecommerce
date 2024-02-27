import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BiSolidCalendarHeart } from "react-icons/bi";
import { MdAmpStories, MdCompare, MdDashboard } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { FaUserPen } from "react-icons/fa6";

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);

  const { pathname } = useLocation();

  return (
    <div>
      <Headers />
      <div className="bg-slate-200/70 mt-5">
        <div className="w-[90%] mx-auto pt-5 md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-orange-500 text-white"
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto ">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
            <div
              className={`bg-slate-50 md-lg:shadow-lg  rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 border-r`}
            >
              <div className="py-5 text-slate-600 ">
                <Link
                  to="/dashboard"
                  className={`dashboard-link pl-7 ${
                    pathname === "/dashboard" ? "border-r-2 bg-orange-100 border-orange-600" : ""
                  }`}
                >
                  <span className="text-xl">
                    <MdDashboard />
                  </span>
                  <span className="block">Dashboard</span>
                </Link>
                <Link
                  to="/dashboard/my-orders"
                  className={`dashboard-link  pl-7 ${
                    pathname === "/dashboard/my-orders" ? "border-r-2 bg-orange-100 border-orange-600" : ""
                  }`}
                >
                  <span className="text-xl">
                    <MdAmpStories />
                  </span>
                  <span className="block">My Orders</span>
                </Link>
                <Link
                  to="/dashboard/my-compare"
                  className={`dashboard-link pl-7  ${
                    pathname === "/dashboard/my-compare" ? "border-r-2 bg-orange-100 border-orange-600" : ""
                  }`}
                >
                  <span className="text-xl">
                    <MdCompare />
                  </span>
                  <span className="block">Compare</span>
                </Link>
                <Link
                  to="/dashboard/my-wishlist"
                  className={`dashboard-link pl-7 ${
                    pathname === "/dashboard/my-wishlist" ? "border-r-2 bg-orange-100 border-orange-600" : ""
                  }`}
                >
                  <span className="text-xl">
                    <BiSolidCalendarHeart />
                  </span>
                  <span className="block">Wishlist</span>
                </Link>
                {/* setting */}
                <span className="font-bold ">
                  <span className="block pl-5 text-xl pt-7 pb-2">Setting</span>
                </span>
                <Link
                  to="/dashboard/edit-profile"
                  className={`dashboard-link pl-7 ${
                    pathname === "/dashboard/edit-profile" ? "border-r-2 bg-orange-100 border-orange-600" : ""
                  }`}
                >
                  <span className="text-xl">
                    <FaUserPen />
                  </span>
                  <span className="block">Edit Profile</span>
                </Link>
                <Link
                  to="/dashboard/change-password"
                  className={`dashboard-link pl-7 ${
                    pathname === "/dashboard/change-password"
                      ? "border-r-2 bg-orange-100 border-orange-600"
                      : ""
                  }`}
                >
                  <span className="text-xl ">
                    <Si1Password />
                  </span>
                  <span className="block">Change Password</span>
                </Link>
              </div>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
