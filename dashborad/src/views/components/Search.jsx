import React from "react";

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-green-500 outline-none bg-gray-50 border border-slate-300 rounded-md text-slate-600"
      >
        <option value="5">5</option>
        <option value="5">15</option>
        <option value="5">25</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="px-4 py-2 focus:border-green-500 outline-none bg-gray-50 border border-slate-300 rounded-md text-slate-600"
        type="text"
        placeholder="search"
      />
    </div>
  );
};

export default Search;
