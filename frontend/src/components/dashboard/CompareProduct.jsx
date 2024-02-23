import React, { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { get_compare_products, messageClear, remove_compare } from "../../store/reducers/cardReducer";

const CompareProduct = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { comparelist, successMessage, errorMessage } = useSelector((state) => state.card);
  useEffect(() => {
    dispatch(get_compare_products(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4  text-slate-600 uppercase">Compare Products</h2>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {comparelist.length < 2 ? (
          <p className="text-gray-800">Please select at least two products to compare.</p>
        ) : (
          <div className="  min-w-[75vw] ">
            <table className="border-collapse border border-gray-100">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-300 ">
                  <th className="p-3 border-r w-32 border-gray-200"></th>
                  {comparelist.map((product) => (
                    <th key={product._id} className="p-3 relative border-r  border-gray-200 ">
                      <img src={product.image} alt="img" className="w-[220px] h-40" />
                      <span
                        onClick={() => dispatch(remove_compare(product._id))}
                        className="absolute cursor-pointer top-1 right-1 bg-orange-500 shadow w-8 h-8 flex justify-center items-center rounded-full "
                      >
                        <RxCross1 color="white" />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-800 bg-slate-200 shadow">
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-semibold">Name</td>
                  {comparelist.map((product) => (
                    <td key={`${product._id}-bluetooth`} className="p-3 border-r border-gray-200">
                      {product.name}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-semibold">Price</td>
                  {comparelist.map((product) => (
                    <td key={`${product._id}-bluetooth`} className="p-3 border-r border-gray-200">
                      {product.price}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-semibold">Discount</td>
                  {comparelist.map((product) => (
                    <td key={`${product._id}-bluetooth`} className="p-3 border-r border-gray-200">
                      {product.discount}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-semibold">Ratings</td>
                  {comparelist.map((product) => {
                    return (
                      <td key={`${product._id}-bluetooth`} className="p-3 border-r border-gray-200">
                        {product.rating}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-semibold">Published</td>
                  {comparelist.map((product) => {
                    const createdAt = "2024-02-22T06:54:34.410Z";
                    const dateObject = new Date(createdAt);
                    const formattedDate = dateObject.toLocaleDateString("en-US", {
                      month: "short", // Short month name (e.g., "Feb")
                      day: "2-digit", // Two-digit day of the month (e.g., "22")
                      year: "numeric", // Four-digit year (e.g., "2024")
                    });
                    return (
                      <td key={`${product._id}-bluetooth`} className="p-3 border-r border-gray-200">
                        {formattedDate}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CompareProduct;
