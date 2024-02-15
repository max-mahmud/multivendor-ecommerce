import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import axios from "axios";
import { useState } from "react";
import CheckoutForm from "./CheckOutForm.js";

const stripePromise = loadStripe(
  "pk_test_51N8amPIt63Wcx3eVNwU7baM9MIHf35crr0TLAi5YdXiKleuhOWU4q5p99J7P1IB9NeVDtd58a2H4mQ0gOYRZgy3e00Z7PSTq4t"
);
const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const apperance = {
    theme: "stripe",
  };
  const options = {
    apperance,
    clientSecret,
  };
  const create_payment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment",
        { price },
        { withCredentials: true }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="mt-2">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={create_payment}
          className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
        >
          Start Payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
