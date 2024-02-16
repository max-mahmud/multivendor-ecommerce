import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";
import img1 from "../../assets/image/44.jpg";
import img2 from "../../assets/image/45.jpg";
import img3 from "../../assets/image/46.jpg";
import img4 from "../../assets/image/47.jpg";

const DiscountProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-slate-100 rounded-md">
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-sm text-slate-600 uppercase border-b bg-slate-300">
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
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[img1, img3, img2, img4, img1].map((d, i) => (
                <tr key={i}>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <img className="w-[45px] h-[45px]" src={d} alt="" />
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Men's Premium soft..</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Sports</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>Easy</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>$565</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>5%</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span>10</span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
                      </button>
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

export default DiscountProducts;
