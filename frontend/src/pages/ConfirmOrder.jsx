import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { ImSpinner4 } from "react-icons/im";

const load = async () => {
  return await loadStripe(
    "pk_test_51N8amPIt63Wcx3eVNwU7baM9MIHf35crr0TLAi5YdXiKleuhOWU4q5p99J7P1IB9NeVDtd58a2H4mQ0gOYRZgy3e00Z7PSTq4t"
  );
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempStripe = await load();
        setStripe(tempStripe);
      } catch (error) {
        console.error("Error loading Stripe:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) return;

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("succeeded");
            break;
          case "processing":
            setMessage("processing");
            break;
          case "requires_payment_method":
            setMessage("failed");
            break;
          default:
            setMessage("failed");
        }
      })
      .catch((error) => {
        console.error("Error retrieving payment intent:", error);
        setMessage("failed");
        // Handle error gracefully, e.g., display an error message
      });
  }, [stripe]);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    console.log(orderId);
    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.error("Error updating payment:", error);
        // Handle error gracefully, e.g., display an error message
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <h4 className="text-4xl text-red-500 font-bold">Error</h4>
          <Link className="px-5 py-2 bg-green-500 rounded-sm text-white" to="/dashboard/my-orders">
            Back to Dashboard
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <ImSpinner4 size={44} className="animate-spin" />
        ) : (
          <>
            <h4 className="text-4xl text-green-500 font-bold">Payment Success</h4>
            <Link className="px-5 py-2 bg-green-500 rounded-sm text-white" to="/dashboard/my-orders">
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <ImSpinner4 size={44} className="animate-spin" />
      )}
    </div>
  );
};

export default ConfirmOrder;
