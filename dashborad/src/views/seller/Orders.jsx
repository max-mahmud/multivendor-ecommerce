import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_orders } from "../../store/Reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        sellerId: userInfo._id,
      })
    );
  }, [parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-slate-100 rounded-md">
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
        <div className="relative overflow-x-auto mt-3">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="sm:text-sm text-xs text-slate-600 uppercase border-b bg-slate-300">
              <tr>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Order Id
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Price
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Payment Status
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Order Status
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Date
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i}>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    <span>{d.payment_status}</span>
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    <span>{d.delivery_status}</span>
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    ${d.date}
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className="p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
