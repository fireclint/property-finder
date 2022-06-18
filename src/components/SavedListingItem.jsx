import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const SavedListingItem = ({ data }) => {
  return (
    <div className='border border-b-4 border-b-[#006aff] shadow-lg relative hover:scale-105 duration-300 '>
      <AiOutlineClose className='absolute text-white top-2 right-2 text-3xl cursor-pointer' />
      <div>
        <img src={data.img} alt='House' />
      </div>
      <div className='p-2'>
        <p className='font-medium text-xl py-1'>
          ${data.price.toLocaleString()}
        </p>
        <div className='flex justify-between w-[60%] py-1 text-sm'>
          <p>{data.beds && data.beds} bds</p>
          <p>{data.baths} ba</p>
          <p>{data.sqft.toLocaleString()} sqft</p>
        </div>
        <p className='text-sm py-1'>{data.address}</p>
        <p className='text-xs text-gray-600 py-1'>Listing ZPID: #{data.id}</p>
      </div>
    </div>
  );
};

export default SavedListingItem;
