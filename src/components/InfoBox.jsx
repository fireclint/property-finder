import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const InfoBox = ({ info, handleClick }) => {
  const [box, setBox] = useState(true);

  return (
    <div
      className={
        box
          ? 'absolute  p-1 bg-white text-sm z-20 border flex justify-between'
          : 'hidden'
      }
    >
      <div className='flex'>
        <img className='w-[170px] mr-4' src={info.img} alt='/' />
        <div>
          <p className='font-bold'>${info.price.toLocaleString()}</p>
          <div className='flex'>
            <p className='mr-2'>{info.bed} bd</p>
            <p>{info.bath} ba</p>
          </div>
          <p>{info.sqft.toLocaleString()} sqft</p>
          <p className='text-sm py-2'>{info.address}</p>
        </div>
      </div>

      <p onClick={handleClick}>
        <FaTimes className='m-1' />
      </p>
    </div>
  );
};

export default InfoBox;
