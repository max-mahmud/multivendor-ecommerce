import React, { useState } from "react";
import img1 from "../../assets/45.jpg";
const EditProfile = () => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [photo, setPhoto] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");
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
    // You can handle form submission here, like sending data to backend
    console.log("Name:", name);
    console.log("Website:", website);
    console.log("Photo:", photo);
    console.log("Occupation:", occupation);
    console.log("Bio:", bio);

    // Reset fields after submission if needed
    setName("");
    setWebsite("");
    setPhoto(null);
    setPhotoUrl(null);
    setOccupation("");
    setBio("");
  };
  const userData = {
    name: "abc",
    website: "www.abc.com",
    occupation: "web developer",
    bio: "Nothng",
    photoUrl: img1,
  };

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
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {photoUrl && (
                  <img src={photoUrl} alt="Uploaded" className="mt-2 max-w-[250px] max-h-[250px]" />
                )}
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
        <div className="pl-5 mx-auto ">
          <h2 className="text-2xl font-bold mb-4 text-slate-600 uppercase">Profile</h2>
          <div className=" bg-slate-50 p-7 shadow relative">
            <button
              onClick={() => setEdit(!edit)}
              className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 px-5 py-1.5 font-medium text-white rounded"
            >
              Edit Profile
            </button>
            <div className="flex justify-center">
              <img
                src={userData.photoUrl}
                alt="Profile"
                className="mt-2 w-[200px] h-[200px] shadow-md mb-4 rounded-full"
              />
            </div>
            <p className="text-center font-medium text-slate-600 mb-3">Name: {userData.name}</p>

            <p className="text-center font-medium text-slate-600 mb-3">Website: {userData.website}</p>

            <p className="text-center font-medium text-slate-600 mb-3">Occupation: {userData.occupation}</p>

            <p className="text-center font-medium text-slate-600 mb-3">Bio: {userData.bio}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
