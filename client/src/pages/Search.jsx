import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form action="" className='flex flex-col gap-8'>
                <div className="flex items-center gap-4 ">
                    <label  className='whitespace-nowrap font-semibold'>Search Term :</label>
                    <input type='text' id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full'/>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Type:</label>
                    <div className="flex gap-3">
                        <input type="checkbox" id="all"className='w-5' />
                        <span className="">Rent & Sale</span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id="rent"className='w-5' />
                        <span className="">Rent</span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id="sale"className='w-5' />
                        <span className="">Sale</span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id="offer"className='w-5' />
                        <span className="">Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Ammenities:</label>
                    <div className="flex gap-3">
                        <input type="checkbox" id="parking"className='w-5' />
                        <span className="">Parking</span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id="furnished"className='w-5' />
                        <span className="">Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <label className='font-semibold'>Sort:</label>
                    <select  id="sort_order" className='border rounded-lg p-3'>
                        <option >Price high to Low</option>
                        <option >Price Low to high </option>
                        <option >Latest</option>
                        <option >Oldest</option>
                    </select>
                </div>
                <button className='text-white p-3 rounded-lg bg-slate-700 hover:opacity-80 font-semibold'>Search</button>
            </form>
        </div>
        <div className="">
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-3'>Listing Results :</h1>
        </div>
    </div>
  )
}

export default Search