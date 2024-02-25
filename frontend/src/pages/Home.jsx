import React, { useEffect } from "react";
import Heders from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import Brands from "../components/Brands";
import DiscountBanner from "../components/DiscountBanner";
import { useDispatch, useSelector } from "react-redux";
import { all_banners, get_products } from "../store/reducers/homeReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, latest_product, topRated_product, discount_product } = useSelector((state) => state.home);
  const { banners } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
    dispatch(all_banners());
  }, []);

  const filterBanner = [...banners].filter((item) => item.type === "small");
  const link1 = filterBanner[filterBanner.length - 1]?.link;
  const link2 = filterBanner[filterBanner.length - 2]?.link;
  return (
    <div className="w-full bg-slate-100">
      <Heders />
      <Banner banners={banners} />
      <div className="my-4">
        <Categorys />
      </div>
      <div className="pt-10 pb-6">
        <Brands />
      </div>
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>
      <div className="py-[35px]">
        <DiscountBanner link1={link2} link2={link1} />
      </div>
      <div className="py-10">
        <div className="w-[85%] sm:w-[90%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-2 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="grid grid-cols-5 sm:grid-cols-1 gap-5">
              <div className="space-y-8 col-span-2 ">
                <div className="text-xl font-bold text-slate-600 sm:hidden flex">Latest Product</div>
                <img
                  onClick={() => navigate(`/product/details/${link1}`)}
                  src={filterBanner[filterBanner.length - 1]?.banner}
                  className="cursor-pointer sm:hidden flex"
                  alt="banner"
                />
              </div>
              <div className="col-span-3">
                <Products title="Latest Product" products={latest_product} />
              </div>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-1 gap-5">
              <div className="space-y-8 col-span-2 ">
                <div className="text-xl sm:hidden flex font-bold text-slate-600">Top Rated Product</div>
                <img
                  onClick={() => navigate(`/product/details/${link2}`)}
                  src={filterBanner[filterBanner.length - 2]?.banner}
                  className="cursor-pointer sm:hidden flex"
                  alt="banner"
                />
              </div>
              <div className="col-span-3">
                <Products title="Latest Product" products={topRated_product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
