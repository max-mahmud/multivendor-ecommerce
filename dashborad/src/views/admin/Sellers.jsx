import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import cateImage from "../../assets/image/44.jpg";

const Sellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-slate-100 rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-green-500 outline-none bg-slate-100 border border-slate-300 rounded-md text-slate-600"
          >
            <option value="5">5</option>
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            className="px-4 py-2 focus:border-green-500 outline-none bg-slate-100 border border-slate-300 rounded-md text-slate-600"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="relative overflow-x-auto mt-3">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-600 uppercase border-b bg-slate-300">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Devision
                </th>
                <th scope="col" className="py-3 px-4">
                  District
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal">
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <img className="w-[45px] h-[45px]" src={cateImage} alt="" />
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Jakir Hasan</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Jakir Fausion</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>pending</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Jakir@gmail.com</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Rajshahi</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>chapai</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to="/admin/dashboard/seller/details/1"
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Sellers;
