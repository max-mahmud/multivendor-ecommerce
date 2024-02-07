import React from "react";
import Heders from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import Brands from "../components/Brands";
import DiscountBanner from "../components/DiscountBanner";
import roate1 from "../assets/rotate.jpg";
import roate2 from "../assets/rotate2.jpg";

const Home = () => {
  return (
    <div className="w-full">
      <Heders />
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div className="pt-10 pb-6">
        <Brands />
      </div>
      <div className="py-[45px]">
        <FeatureProducts />
      </div>
      <div className="py-[35px]">
        <DiscountBanner />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-2 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="grid grid-cols-5 gap-5">
              <div className="space-y-8 col-span-2 ">
                <div className="text-xl font-bold text-slate-600">Latest Product</div>
                <img src={roate1} alt="banner" />
              </div>
              <div className="col-span-3">
                <Products title="Latest Product" />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-5">
              <div className="space-y-8 col-span-2 ">
                <div className="text-xl font-bold text-slate-600">Top Rated Product</div>
                <img src={roate2} alt="banner" />
              </div>
              <div className="col-span-3">
                <Products title="Latest Product" />
              </div>
            </div>
            {/* 
            <div className="overflow-hidden">
              <Products title="Discount Product" />
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
