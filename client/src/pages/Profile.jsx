import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserfailure,
  updateUserStart,
  updateUserSucess,
  updateUserfailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpadateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userlistings, setUserlistings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "real_estate_work");
    data.append("cloud_name", "dwjtkdwul");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwjtkdwul/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedimageURL = await res.json();
    console.log(uploadedimageURL.url);
    if (uploadedimageURL) {
      setFormData({ ...formData, avatar: uploadedimageURL.secure_url });
      console.log(formData);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserfailure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
      setUpadateSuccess(true);
    } catch (error) {
      dispatch(updateUserfailure(error.mesage));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserfailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserfailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logoutUserfailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data));
    } catch (error) {
      dispatch(logoutUserfailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserlistings(data.Listings);
      console.log(userlistings);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingdelete=async(listingId)=>{
      try {
        const res=await fetch(`/api/listing/delete/${listingId}`,{
          method:"DELETE",
        });
        const data=await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        setUserlistings((prev)=>prev.filter((listing)=>listing._id !== listingId));
      } catch (error) {
        console.log(error.message)
      }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          type="file"
          className=""
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar?.secure_url || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 mt-2 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 mt-2 rounded-lg"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 mt-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70 font-semibold"
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg text-center font-semibold hover:opacity-90"
          to={"/createlisting"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : " "}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated Sucessfully!!" : " "}
      </p>
      <button
        onClick={handleShowListings}
        className=" mt-3 rounded-lg text-white bg-green-700 w-full p-3"
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-3">
        {showListingsError ? "Error showing Listings" : " "}
      </p>
      
      {userlistings &&
        userlistings.length > 0 &&
        <div className="flex flex-col gap-4">    
        <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
        {userlistings.map((listing) => (
          <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center m-2 gap-4">
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain" />
            </Link>
            <Link to={`/listing/${listing._id}`} className=" text-slate-700 font-semibold flex-1 hover:underline truncate">
            <p className="">{listing.name}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button className="text-red-700" onClick={()=>handleListingdelete(listing._id)}>Delete</button>
              <Link to={`/updatelisting/${listing._id}`}><button className="text-green-700">Edit</button></Link>
            </div>
          </div>
        ))}
        </div>
        }
    </div>
  );
};

export default Profile;
