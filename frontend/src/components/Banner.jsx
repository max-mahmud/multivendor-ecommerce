import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const Banner = ({ banners }) => {
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

  const filterBanner = [...banners]?.filter((item) => item.type === "small");
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-0">
          <div className=" w-3/5 md-lg:w-full">
            <div className="my-8">
              {banners ? (
                <Carousel
                  autoPlay={true}
                  infinite={true}
                  arrows={true}
                  showDots={true}
                  responsive={responsive}
                >
                  {banners.map((prd, i) => {
                    if (prd.type === "big") {
                      return (
                        <Link className=" h-[350px] block" key={i} to={`/product/details/${prd.link}`}>
                          <img src={prd.banner} alt="banner" className="h-full w-full" />
                        </Link>
                      );
                    }
                  })}
                </Carousel>
              ) : (
                // Use Skeleton loading effect
                <Skeleton styles={"h-[350px]"} />
              )}
            </div>
          </div>
          <div className="w-2/5 md-lg:w-full grid grid-cols-2 gap-2 py-7 pl-4 md-lg:pl-0">
            {filterBanner
              ? filterBanner.slice(0, 4).map((prd, i) => {
                  return (
                    <Link
                      to={`/product/details/${prd.link}`}
                      className="w-full p-1 bg-slate-200 cursor-pointer hoverEffect"
                    >
                      <img
                        src={prd.banner}
                        alt="banner"
                        className="w-full h-[166px] -z-20 absolute-overlay"
                      />
                    </Link>
                  );
                })
              : [1, 2, 3, 4].map((_, i) => <Skeleton styles={"h-[167px] mt-1"} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
