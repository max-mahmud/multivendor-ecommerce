import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  get_seller_order,
  messageClear,
  seller_order_status_update,
} from "../../store/Reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, errorMessage, successMessage } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId]);

  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);
  const status_update = (e) => {
    dispatch(seller_order_status_update({ orderId, info: { status: e.target.value } }));
    setStatus(e.target.value);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-slate-100 shadow rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl ">Order Details</h2>
          <select
            onChange={status_update}
            value={status}
            name=""
            id=""
            className="px-4 py-2 focus:border-green-500 outline-none bg-slate-200 border border-slate-300 rounded-md "
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-slate-600">
            <h2>#{order._id}</h2>
            <span>{order.date}</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-slate-600 text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">Deliver to : {order.shippingInfo}</h2>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status : </h2>
                  <span className="text-base">{order.payment_status}</span>
                </div>
                <span>Price : ${order.price}</span>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-slate-600 flex flex-col gap-6">
                    {order?.products?.map((p, i) => (
                      <div key={i} className="flex gap-3 text-md">
                        <img className="w-[45px] h-[45px]" src={p.images[0]} alt="" />
                        <div>
                          <h2>{p.name}</h2>
                          <p>
                            <span>Brand : </span>
                            <span>{p.brand} </span>
                            <span className="text-lg">Quantity : {p.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
