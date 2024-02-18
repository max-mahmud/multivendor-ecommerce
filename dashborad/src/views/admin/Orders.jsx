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
            <div className="text-sm text-slate-600 bg-slate-300 uppercase border-b border-slate-400">
              <div className="flex justify-between items-start font-medium">
                <div className="py-3 w-[25%]">Order Id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Payment Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">
                  <BsArrowBarDown />
                </div>
              </div>
            </div>
            {myOrders.map((o, i) => (
              <div className="text-slate-700">
                <div className="flex justify-between items-start border-b border-slate-300">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap">{o._id}</div>
                  <div className="py-4 w-[13%]">${o.price}</div>
                  <div className="py-4 w-[18%]">{o.payment_status}</div>
                  <div className="py-4 w-[18%]">{o.delivery_status}</div>
                  <div className="py-4 w-[18%]">
                    <Link to={`/admin/dashboard/order/details/${o._id}`}>view</Link>
                  </div>
                  <div
                    onClick={(e) => setShow(show === o._id ? "" : o._id)}
                    className="py-4 cursor-pointer w-[8%]"
                  >
                    <MdKeyboardArrowDown />
                  </div>
                </div>
                <div className={show === o._id ? "block border-b border-slate-400 bg-slate-300" : "hidden"}>
                  {o.suborder.map((so, i) => (
                    <div className="flex justify-start items-start border-b border-slate-400">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">${so._id}</div>
                      <div className="py-4 w-[13%]">${so.price}</div>
                      <div className="py-4 w-[18%]">{so.payment_status}</div>
                      <div className="py-4 w-[18%]">{so.delivery_status}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
