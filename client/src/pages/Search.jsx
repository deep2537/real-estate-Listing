import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(listings);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
      console.log("Sidebar data",sidebarData);
    }
    const fetchListings = async () => {
      setLoading(true);
      //setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      // if (data.length > 8) {
      //   setShowMore(true);
      // } else {
      //   setShowMore(false);
      // }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  },[location.search]);
  const handleChange = (e) => {
    if(e.target.id === 'all'||e.target.id === 'rent'|| e.target.id === "sale"){
        setSidebarData({...sidebarData,type:e.target.id});
    }
    if(e.target.id==="searchTerm"){
        setSidebarData({...sidebarData,searchTerm:e.target.value});
    }
    if(e.target.id==="parking"||e.target.id==="offer"||e.target.id==="furnished"){
        setSidebarData({...sidebarData,[e.target.id]:e.target.checked||e.target.checked===true?true:false});
    }
    if(e.target.id==='sort_order'){
      const sort=e.target.value.split('_')[0] || 'created_at';
      const order=e.target.value.split('_')[1] || 'desc';
      setSidebarData({...sidebarData,sort,order})
    }
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams= new URLSearchParams();
    urlParams.set('searchTerm',sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-8">
          <div className="flex items-center gap-4 ">
            <label className="whitespace-nowrap font-semibold">
              Search Term :
            </label>
            <input
              onChange={handleChange}
              value={sidebarData.searchTerm}
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="sale" className="w-5"  onChange={handleChange}
                checked={sidebarData.type === "sale"}/>
              <span className="">Sale</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="offer" className="w-5"  onChange={handleChange}
                checked={sidebarData.offer} />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Ammenities:</label>
            <div className="flex gap-3">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChange}
                checked={sidebarData.parking} />
              <span className="">Parking</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebarData.furnished}/>
              <span className="">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className="border rounded-lg p-3">
              <option value="regularPrice_desc" >Price high to Low</option>
              <option value="regularPrice_asc">Price Low to high </option>
              <option value='createdAt_desc'>Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="text-white p-3 rounded-lg bg-slate-700 hover:opacity-80 font-semibold">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-3">
          Listing Results :
        </h1>
      </div>
    </div>
  );
};

export default Search;
