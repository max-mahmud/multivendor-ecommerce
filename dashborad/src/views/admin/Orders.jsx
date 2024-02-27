import React, { useEffect, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/Reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(
      get_admin_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
      })
    );
  }, [parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-slate-100 rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-green-500 outline-none bg-slate-100 border border-slate-400 rounded-md text-slate-600"
          >
            <option value="5">5</option>
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            className="px-4 py-2 focus:border-green-500 outline-none bg-slate-100 border border-slate-400 rounded-md text-slate-600"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left slate-600">
            <table className="w-full">
              <thead className="text-sm text-slate-600 bg-slate-300 uppercase border-b border-slate-400">
                <tr className="font-medium">
                  <th className="py-3 px-2 whitespace-nowrap">Order Id</th>
                  <th className="py-3 px-2 whitespace-nowrap">Price</th>
                  <th className="py-3 px-2 whitespace-nowrap">Payment Status</th>
                  <th className="py-3 px-2 whitespace-nowrap">Order Status</th>
                  <th className="py-3 px-2 whitespace-nowrap ">Action</th>
                  <th className="py-3 px-2 whitespace-nowrap ">
                    <BsArrowBarDown />
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {myOrders.map((o, i) => (
                  <React.Fragment key={o._id}>
                    <tr className="border-b border-slate-300">
                      <td className="py-4 px-2 font-medium whitespace-nowrap">{o._id}</td>
                      <td className="py-4 px-2 whitespace-nowrap">${o.price}</td>
                      <td className="py-4 px-2 whitespace-nowrap">{o.payment_status}</td>
                      <td className="py-4 px-2 whitespace-nowrap">{o.delivery_status}</td>
                      <td className="py-4 px-2 whitespace-nowrap">
                        <Link
                          to={`/admin/dashboard/order/details/${o._id}`}
                          className="bg-green-200 px-2 py-1"
                        >
                          view
                        </Link>
                      </td>
                      <td
                        onClick={(e) => setShow(show === o._id ? "" : o._id)}
                        className="py-1 px-2 cursor-pointer whitespace-nowrap "
                      >
                        <MdKeyboardArrowDown />
                      </td>
                    </tr>
                    {show === o._id && (
                      <tr className="bg-slate-300">
                        <td colSpan="6">
                          <table className="w-full">
                            <tbody>
                              {o.suborder.map((so, i) => (
                                <tr key={so._id} className="border-b border-slate-400">
                                  <td className="py-4 px-3 w-[25%] font-medium whitespace-nowrap">
                                    ${so._id}
                                  </td>
                                  <td className="py-4 px-3 w-[13%]">${so.price}</td>
                                  <td className="py-4 px-3 w-[18%]">{so.payment_status}</td>
                                  <td className="py-4 px-3 w-[18%]">{so.delivery_status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
