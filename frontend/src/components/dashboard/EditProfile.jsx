import React, { useEffect, useState } from "react";
import { SiSpinrilla } from "react-icons/si";
import { MdOutlineUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  add_info,
  get_profile_data,
  messageClear,
  profile_image_upload,
} from "./../../store/reducers/authReducer";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { profileData, userInfo, successMessage, loader } = useSelector((state) => state.auth);

  const [name, setName] = useState(profileData?.name);
  const [website, setWebsite] = useState(profileData?.website);
  const [photo, setPhoto] = useState(null);
  const [occupation, setOccupation] = useState(profileData?.occupation);
  const [bio, setBio] = useState(profileData?.bio);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userInfo.id);

    dispatch(profile_image_upload(formData));

    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(add_info({ name, website, occupation, bio, userId: userInfo.id }));

    setEdit(false);
  };

  useEffect(() => {
    dispatch(get_profile_data(userInfo.id));
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <>
      {edit ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-slate-600 uppercase">Edit Profile</h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website:</label>
                <input
                  type="text"
                  value={website}
                  onChange={handleWebsiteChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation:</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={handleOccupationChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio:</label>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <button
                  type="submit"
                  className="bg-orange-500 font-medium text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEdit(!edit)}
                  type="button"
                  className="bg-green-500 font-medium text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  See Profile
                </button>
              </div>
            </form>
          </div>{" "}
        </>
      ) : (
        <div className="pl-5 mx-auto  ">
          <h2 className="text-2xl font-bold mb-4 text-slate-600 uppercase">Profile</h2>
          <div className=" bg-slate-200 p-7 shadow relative">
            <button
              onClick={() => setEdit(!edit)}
              className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 px-5 py-1.5 font-medium text-white rounded"
            >
              Edit Profile
            </button>

            {/* ==================== */}
            {loader ? (
              <div className="flex justify-center items-center mx-auto relative rounded-full w-[210px] bg-slate-300  h-[210px]">
                <SiSpinrilla size={56} className="animate-spin text-orange-500" />
              </div>
            ) : (
              <div className="flex justify-center mx-auto relative rounded-full w-[210px] h-[210px]">
                {/* Invisible file input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                  style={{ zIndex: -1 }} // Ensure the input is behind other elements
                  id="photoInput"
                />
                {/* Label to trigger file input */}
                <label htmlFor="photoInput" className="cursor-pointer">
                  {profileData.photo ? (
                    <>
                      <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
                        <MdOutlineUpload className="bg-black w-20 h-20 p-2 rounded-full text-white" />
                      </div>
                      {/* Uploaded photo */}
                      <img
                        src={profileData?.photo}
                        alt="Profile"
                        className="mt-2 w-[200px] h-[200px] shadow-md mb-4 rounded-full"
                      />
                    </>
                  ) : (
                    <div className="w-[200px] h-[200px] hover:bg-slate-500 flex rounded-full justify-center items-center bg-slate-400">
                      <MdOutlineUpload className=" w-20 h-20 p-2 rounded-full text-white" />
                    </div>
                  )}
                </label>
                {/* Hover effect */}
              </div>
            )}

            {/* ==================== */}
            <p className="text-center font-medium text-slate-600 mb-3">Name: {profileData?.name}</p>

            <p className="text-center font-medium text-slate-600 mb-3">Website: {profileData?.website}</p>

            <p className="text-center font-medium text-slate-600 mb-3">
              Occupation: {profileData?.occupation}
            </p>

            <p className="text-center font-medium text-slate-600 mb-3">Bio: {profileData?.bio}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
