import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const PageHeader = ({ title = "All Products", slug = "", category = "shops" }) => {
  return (
    <section className=" bg-slate-200  shadow bg-cover bg-no-repeat ">
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
        <div className="flex bg-slate-200 text-slate-700 py-5 px-2">
          <div className="flex justify-center items-center gap-2 text-2xl ">
            <Link to="/">Home</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span>{category}</span>
            {slug && (
              <>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>{slug}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold flex-1 text-center">{title}</h2>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
