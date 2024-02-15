import React from "react";
import Stripe from "../components/Stripe";
import { useLocation } from "react-router-dom";
import Headers from "../components/Headers";
import Footer from "../components/Footer";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();

  return (
    <>
      <Headers />
      <div className="bg-slate-100 ">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-20 ">
          <div className="bg-white shadow p-8 flex justify-center ">
            <span className="text-xl font-medium text-gray-600">
              <Stripe orderId={orderId} price={price} />
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
