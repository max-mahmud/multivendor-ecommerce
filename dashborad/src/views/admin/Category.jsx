import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { BsImage } from "react-icons/bs";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Search from "../components/Search";
import { categoryAdd, messageClear, get_category } from "../../store/Reducers/categoryReducer";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categorys, totalCategory } = useSelector(
    (state) => state.category
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const selectedImage = files[0];
      setImage(URL.createObjectURL(selectedImage));
      setState({
        ...state,
        image: selectedImage,
      });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", state.image);
    formData.append("name", state.name);
    dispatch(categoryAdd(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        image: "",
      });
      setImage("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, parPage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-gray-50 rounded-md">
        <h1 className="text-slate-600 font-semibold text-lg">Categorys</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-green-500 shadow-lg hover:shadow-green-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4  bg-gray-50 rounded-md">
            <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-sm text-slate-600 uppercase border-b border-slate-700">
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((d, i) => (
                    <tr key={i} className="border-b">
                      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                        <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                      </td>
                      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                        <span>{d.name}</span>
                      </td>
                      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap text-white">
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit />
                          </Link>
                          <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
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
                totalItem={totalCategory}
                parPage={parPage}
                showItem={4}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-gray-50 h-screen lg:h-auto px-3 py-2 lg:rounded-md text-slate-600">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-slate-600 font-semibold text-xl">Add Category</h1>
                <div onClick={() => setShow(false)} className="block lg:hidden cursor-pointer">
                  <GrClose className="text-slate-600" />
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Category name</label>
                  <input
                    value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                    className="px-4 py-2 focus:border-green-500 outline-none bg-gray-50 border border-slate-700 rounded-md text-slate-600"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="category name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-green-500 w-full border-[#828385]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  required
                />
                <div className="mt-4">
                  <button
                    disabled={loader ? true : false}
                    className="bg-green-500 w-full hover:shadow-green-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
