import React, { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { FaSearch } from "react-icons/fa";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
const Header = () => {
const {currentUser}=useSelector(state=>state.user);
const[searchTerm,SetSearchTerm]=useState('');
const navigate=useNavigate();
const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams=new URLSearchParams(window.location.search);
  urlParams.set('search',searchTerm);
  const searchQuery=urlParams.toString();
  navigate(`/search?${searchQuery}`);
}
useEffect(()=>{
  const urlParams=new URLSearchParams(location.search);
  const searchtermFromUrl=urlParams.get('search');
  if(searchtermFromUrl){
    SetSearchTerm(searchtermFromUrl);
    console.log(searchTerm);
  }
},[location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Dev</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        <ErrorBoundary>
          <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e)=>SetSearchTerm(e.target.value)}
            />
            <button>            <FaSearch className="text-slate-600" />
            </button>
          </form>
        </ErrorBoundary>
        <ul className="flex gap-4">
          <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </li>
          </Link>
          <Link to='/about'>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            About
          </li>
          </Link>
          <Link to='/profile'>
          {
            currentUser?(
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ):
            <li className="hidden sm:inline text-slate-700 hover:underline">
            Sign In
          </li>
          }  
          </Link>
        </ul>
      </div>
    </header>
  );
};
export default Header;
