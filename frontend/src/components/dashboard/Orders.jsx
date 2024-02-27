import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, order } = useSelector((state) => state.order);
  const [state, setState] = useState("all");

  useEffect(() => {
    dispatch(get_orders({ status: state, customerId: userInfo.id }));
  }, [state]);

  const redirect = (ord) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: ord.price,
        items,
        orderId: ord._id,
      },
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 p-1 bg-slate-50 text-slate-600 uppercase">Orders</h2>
      <div className="bg-slate-50 p-1 rounded-md">
        <div className="flex justify-between items-center">
          <select
            className="outline-none px-3 py-1 border border-orange-300 rounded-md text-slate-600"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="all">--order status---</option>
            <option value="placed">Placed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
        <div className="pt-4 shadow">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-50 uppercase bg-orange-600">
                <tr>
                  <th scope="col" className="px-6 md:px-1 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 md:px-1 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 md:px-1 py-3">
                    Payment status
                  </th>
                  <th scope="col" className="px-6 md:px-1 py-3">
                    Order status
                  </th>
                  <th scope="col" className="px-6 md:px-1 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((o, i) => (
                  <tr key={i} className="bg-orange-100/50 border-b border-white">
                    <td scope="row" className="px-6 md:px-1 py-4 font-medium whitespace-nowrap">
                      {o._id}
                    </td>
                    <td scope="row" className="px-6 md:px-1 py-4 font-medium whitespace-nowrap">
                      ${o.price}
                    </td>
                    <td scope="row" className="px-6 md:px-1 py-4 font-medium whitespace-nowrap">
                      {o.payment_status}
                    </td>
                    <td scope="row" className="px-6 md:px-1 py-4 font-medium whitespace-nowrap">
                      {o.delivery_status}
                    </td>
                    <td scope="row" className="px-6 md:px-1 whitespace-nowrap py-4">
                      <Link to={`/dashboard/order/details/${o._id}`}>
                        <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                          view
                        </span>
                      </Link>
                      {o.payment_status !== "paid" && (
                        <span
                          onClick={() => redirect(o)}
                          className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                        >
                          Pay Now
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
