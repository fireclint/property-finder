import React from 'react';
import { GiPositionMarker } from 'react-icons/gi';

const IconMarker = ({ lat, lng, onClick }) => {
  return (
    <div onClick={onClick}>
      <GiPositionMarker className='text-2xl text-red-600' />
    </div>
  );
};

export default IconMarker;
