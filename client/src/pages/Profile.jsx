import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef =useRef(null);
  const [file,setFile]=useState(undefined);
  const [formData,setFormData]=useState({});
 
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload=async(file)=>{
    const data =new FormData();
    data.append("file",file);
    data.append("upload_preset","real_estate_work");
    data.append("cloud_name","dwjtkdwul");
    const res=await fetch("https://api.cloudinary.com/v1_1/dwjtkdwul/image/upload",{
      method:"POST",
      body:data
    })
    const uploadedimageURL=await res.json();
    console.log(uploadedimageURL.url);
    if(uploadedimageURL){
      setFormData({...formData,avatar:uploadedimageURL});
      console.log(formData);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input type="file" className="" ref={fileRef} hidden accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()}
          src={formData.avatar.secure_url||currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p>
          {

          }
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 mt-2 rounded-lg"
          id="username"
        />
          <input
          type="text"
          placeholder="email"
          className="border p-3 mt-2 rounded-lg"
          id="email"
        />
          <input
          type="password"
          placeholder="password"
          className="border p-3 mt-2 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70 font-semibold">Update</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
