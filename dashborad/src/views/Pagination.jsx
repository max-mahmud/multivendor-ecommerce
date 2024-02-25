import React from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItems }) => {
  let totalPages = Math.ceil(totalItem / parPage);
  let startPage = pageNumber;
  let dif = totalPages - pageNumber;
  if (dif <= showItems) {
    startPage = totalPages - showItems;
  }
  let endPage = startPage < 0 ? showItems : showItems + startPage;
  if (startPage <= 0) {
    startPage = 1;
  }
  let n = 1;
  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={(n += 1)}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-green-600 shadow-green-500/50 text-white "
              : "bg-slate-100 hover:bg-green-600 shadow-md hover:shadow-green-500/50 "
          } w-[33px] h-[33px] rounded-full flex justify-center border border-slate-300 items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center border border-slate-300 items-center bg-slate-100  cursor-pointer "
        >
          <BsChevronDoubleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPages && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full border border-slate-300 flex justify-center items-center bg-slate-100  cursor-pointer "
        >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;