import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { add_banner, get_banner, messageClear, update_banner } from "../../store/Reducers/bannerReducer";
import { toast } from "react-hot-toast";

const AddBanner = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, loader, smallBanner, bigBanner } = useSelector(
    (state) => state.banner
  );
  const { id } = useParams();
  const [bannerShow, setBannerShow] = useState("");
  const [miniShow, setminiShow] = useState("");
  const [type, setType] = useState("big");
  const [banner, setBanner] = useState("");

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setBanner(files[0]);
      setBannerShow(URL.createObjectURL(files[0]));
      setminiShow("");
    }
  };

  const miniImageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setBanner(files[0]);
      setminiShow(URL.createObjectURL(files[0]));
      setBannerShow("");
    }
  };

  const Add = (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("productId", id);
    fromdata.append("type", type);
    fromdata.append("banner", banner);
    dispatch(add_banner(fromdata));
  };

  //   const Update = (e) => {
  //     e.preventDefault();
  //     const fromdata = new FormData();
  //     fromdata.append("banner", banner);
  //     dispatch(update_banner({ info: fromdata, bannerId: bannerImage._id }));
  //   };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setBannerShow("");
      setBanner("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(get_banner(id));
  }, [id, successMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full bg-slate-100 p-4 rounded-md ">
        <div className="flex justify-between pb-4 items-center">
          <h2 className="text-xl  font-semibold">Add Banner</h2>
          <Link
            className="bg-green-500 px-5 rounded-sm py-2 hover:bg-green-600 text-white"
            to={"/seller/dashboard/banners"}
          >
            All Banners
          </Link>
        </div>
        {!bigBanner && (
          <div>
            <h4 className="text-xl font-medium mb-2">Big Banner</h4>
            <form onSubmit={Add}>
              <div className=" mb-4  ">
                <label
                  className="flex justify-center items-center flex-col h-[130px] cursor-pointer border border-dashed hover:border-green-500 border-slate-300 "
                  htmlFor="image"
                >
                  <span className="text-4xl mb-2">
                    <BsFillCloudUploadFill />
                  </span>
                  <span>Select Banner Image</span>
                </label>
                <input
                  onChange={imageHandle}
                  onClick={() => setType("big")}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </div>
              {bannerShow ? (
                <div>
                  <img className="w-full h-auto mb-2" src={bannerShow} alt="img" />
                </div>
              ) : (
                ""
              )}
              <button
                disabled={loader ? true : false}
                className="bg-green-600 font-semibold my-0 py-2 px-7 w-[240px] text-yellow-50 rounded-sm hover:bg-green-700 "
              >
                {loader ? <BeatLoader color="#ffffff" /> : "Add Banner"}
              </button>
            </form>
          </div>
        )}
        {bigBanner && (
          <div>
            <div className="text-xl font-medium my-4">Big Banner</div>
            <div>
              <img className="mb-4 h-[250px]" src={bigBanner.banner} alt="" />
            </div>
            <form>
              <div className=" mb-4 text-[#d0d2d6] ">
                <label
                  className="flex justify-center items-center flex-col h-[130px] cursor-pointer border border-dashed border-slate-400 hover:border-green-500 "
                  htmlFor="image"
                >
                  <span className="text-4xl mb-2">
                    <BsFillCloudUploadFill />
                  </span>
                  <span>Select Banner Image</span>
                </label>
                <input onChange={imageHandle} className="hidden" type="file" id="image" />
              </div>
              {bannerShow ? (
                <div>
                  <img className="w-full h-auto" src={bannerShow} alt="img" />
                </div>
              ) : (
                ""
              )}
              <button
                disabled={true}
                className="bg-green-600 font-semibold my-3 py-2 px-7 w-[240px] text-yellow-50 rounded-sm hover:bg-green-700 "
              >
                {loader ? <BeatLoader color="#ffffff" /> : "Update Banner"}
              </button>
            </form>
          </div>
        )}

        {!smallBanner && (
          <div>
            <h4 className="text-xl font-medium mb-2 mt-7">Mini Banner</h4>
            <form onSubmit={Add}>
              <div className=" mb-4  ">
                <label
                  className="flex justify-center items-center flex-col h-[240px] w-[240px]  cursor-pointer border border-dashed hover:border-green-500 border-slate-300 "
                  htmlFor="small"
                >
                  <span className="text-4xl mb-2">
                    <BsFillCloudUploadFill />
                  </span>
                  <span>Select Banner Image</span>
                </label>
                <input
                  onChange={miniImageHandle}
                  onClick={() => setType("small")}
                  className="hidden"
                  type="file"
                  id="small"
                />
              </div>
              {miniShow ? (
                <div>
                  <img className="w-[240px] h-[240px] mb-2" src={miniShow} alt="img" />
                </div>
              ) : (
                ""
              )}
              <button
                disabled={loader ? true : false}
                className="bg-green-600 font-semibold my-0 py-2 px-7 w-[240px] text-yellow-50 rounded-sm hover:bg-green-700 "
              >
                {loader ? <BeatLoader color="#ffffff" /> : "Add Banner"}
              </button>
            </form>
          </div>
        )}
        {smallBanner && (
          <div>
            <h4 className="text-xl font-medium my-4"> Mini Banner</h4>
            <div>
              <img className="mb-4 h-[240px]" src={smallBanner.banner} alt="" />
            </div>
            <form>
              <div className=" mb-4 text-[#d0d2d6] ">
                <label
                  className="flex justify-center items-center flex-col h-[240px] w-[240px] cursor-pointer border border-dashed border-slate-400 hover:border-green-500 "
                  htmlFor="image"
                >
                  <span className="text-4xl mb-2">
                    <BsFillCloudUploadFill />
                  </span>
                  <span>Select Banner Image</span>
                </label>
                <input onChange={imageHandle} className="hidden" type="file" id="image" />
              </div>
              {bannerShow ? (
                <div>
                  <img className="w-full h-auto" src={bannerShow} alt="img" />
                </div>
              ) : (
                ""
              )}
              <button
                disabled={true}
                className="bg-green-600 font-semibold my-3 py-2 px-7 w-[240px] text-yellow-50 rounded-sm hover:bg-green-700 "
              >
                {loader ? <BeatLoader color="#ffffff" /> : "Update Banner"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanner;
