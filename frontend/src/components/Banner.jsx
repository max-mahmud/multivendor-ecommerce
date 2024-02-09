import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import img1 from "../assets/s2.jpg";
import t1 from "../assets/t1.jpg";
import t2 from "../assets/t2.jpg";
import t3 from "../assets/t3.jpg";
import t4 from "../assets/t4.jpg";

const Banner = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-0">
          <div className=" w-3/5 md-lg:w-full">
            <div className="my-8">
              <Carousel autoPlay={true} infinite={true} arrows={true} showDots={true} responsive={responsive}>
                {[1, 2, 3, 4].map((img, i) => (
                  <Link className=" h-[350px] block" key={i} to="#">
                    <img src={img1} alt="banner" className="h-full w-full" />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="w-2/5 md-lg:w-full grid grid-cols-2 gap-2 py-7 pl-4 md-lg:pl-0">
            <div className="w-full p-1 bg-slate-200 cursor-pointer hoverEffect">
              <img src={t1} alt="banner" className="w-full h-[166px] -z-20 absolute-overlay" />
            </div>
            <div className="w-full p-1 bg-slate-200 cursor-pointer hoverEffect">
              <img src={t2} alt="banner" className="w-full h-[166px] -z-20 absolute-overlay" />
            </div>
            <div className="w-full p-1 bg-slate-200 cursor-pointer hoverEffect">
              <img src={t3} alt="banner" className="w-full h-[166px] -z-20 absolute-overlay" />
            </div>
            <div className="w-full p-1 bg-slate-200 cursor-pointer hoverEffect">
              <img src={t4} alt="banner" className="w-full h-[166px] -z-20 absolute-overlay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
