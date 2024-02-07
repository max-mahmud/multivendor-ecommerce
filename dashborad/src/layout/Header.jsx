import React from "react";
import { FaList } from "react-icons/fa";
import { MdMessage, MdNotifications, MdSearch } from "react-icons/md";
const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40 ">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center shadow-md bg-slate-100 text-slate-600 px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-green-500 shadow-lg hover:shadow-green-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:flex gap-0 w-2/4 ">
          <input
            className="px-3 py-2 outline-none border bg-transparent bg-slate-100 rounded text-gray-600 focus:border-green-500 overflow-hidden w-full"
            type="text"
            name="search"
            placeholder="search"
          />
          <span className="text-xl bg-green-500 cursor-pointer text-white font-bold p-2 px-3 rounded flex justify-center items-center ">
            <MdSearch size={24} />
          </span>
        </div>
        <div className="hidden md:flex gap-5">
          <span className="text-xl bg-slate-200 cursor-pointer text-slate-500 font-bold p-2 rounded-full flex justify-center items-center relative">
            <MdMessage size={26} />
            <span className="absolute -top-1 -right-1 bg-blue-400 rounded-full p-1 px-2 text-xs text-white">
              5
            </span>
          </span>
          <span className="text-xl bg-slate-200 cursor-pointer text-slate-500 font-bold p-2 rounded-full flex justify-center items-center relative">
            <MdNotifications size={26} />
            <span className="absolute -top-1 -right-1 bg-blue-400 rounded-full p-1 px-2 text-xs text-white">
              5
            </span>
          </span>
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-sm font-bold">jakir Hasan</h2>
                <span className="text-[14px] w-full font-normal">Admin</span>
              </div>
              <img className="w-[45px] h-[45px] rounded-full overflow-hidden" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
