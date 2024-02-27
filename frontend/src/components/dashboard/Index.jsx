import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/reducers/dashboardIndexReducer";

const Index = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { totalOrder, pendingOrder, recentOrders, cancelledOrder } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);
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
    <div>
      <h2 className="text-2xl p-1 bg-slate-50 font-bold text-slate-600 mb-4  uppercase">Dashboard</h2>
      <div className="grid grid-cols-3 md:grid-cols-1 md-lg:gap-4 gap-8  font-medium">
        <div className="flex justify-center items-center  shadow-md p-5 bg-green-500 rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
            <span className="text-xl text-green-600">
              <RiShoppingCartFill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-100">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-yellow-500 rounded-md gap-5">
          <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
            <span className="text-xl text-yellow-600">
              <RiShoppingCartFill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-100">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-sky-500 rounded-md gap-5">
          <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ">
            <span className="text-xl text-sky-600">
              <RiShoppingCartFill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-100">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 p-4 md-lg:p-1 mt-5 rounded ">
        <h2 className="text-lg font-semibold text-slate-600">Recent Orders</h2>
        <div className="pt-4 shadow">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs font-medium text-gray-50 uppercase bg-orange-600">
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
                {recentOrders.map((o, i) => (
                  <tr key={i} className="bg-orange-100/50 border-b border-slate-50  ">
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
                    <td scope="row" className="px-6 md:px-1 py-4 whitespace-nowrap">
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
    </div>
  );
};

export default Index;
