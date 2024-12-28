import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { deleteUserStart, deleteUserSuccess, deleteUserfailure, updateUserStart,updateUserSucess,updateUserfailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
const Profile = () => {
  const { currentUser ,loading,error} = useSelector((state) => state.user);
  const fileRef =useRef(null);
  const [file,setFile]=useState(undefined);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpadateSuccess]=useState(false);
  const dispatch=useDispatch();
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
      setFormData({...formData,avatar:uploadedimageURL.secure_url});
      console.log(formData);
    }
  };
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if (data.success === false) {
        dispatch(updateUserfailure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
      setUpadateSuccess(true);
    } catch (error) {
      dispatch(updateUserfailure(error.mesage));
    }
  }
  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      });
      const data= await res.json();
      if(data.success=== false){
        dispatch(deleteUserfailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserfailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input type="file" className="" ref={fileRef} hidden accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()}
          src={formData.avatar?.secure_url||currentUser.avatar}
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
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70 font-semibold">
          {loading?"Loading ...":"Update"}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser}className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">
        {error?error:" "}
      </p>
      <p className="text-green-700 mt-5">
        {
          updateSuccess?"User is updated Sucessfully!!":" "
        }
      </p>
    </div>
  );
};

export default Profile;
