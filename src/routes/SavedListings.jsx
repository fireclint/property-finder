import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { AiOutlineClose } from 'react-icons/ai';

const SavedListings = () => {
  const { user } = useUserAuth();
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
      setHomes(doc.data().savedListings);
    });
  }, [user.email]);

  const listingRef = doc(db, 'users', `${user.email}`);
  const deleteListing = async (passedid) => {
    try {
      // console.log('homes:' + homes);
      // console.log('id:' + passedid);
      const result = homes.filter((item) => item.id !== passedid);

      await updateDoc(listingRef, {
        savedListings: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='max-w-[1240px] mx-auto px-4 py-16'>
      <h1 className='text-3xl font-bold text-gray-700'>Saved Homes</h1>
      <div className='flex w-full justify-between items-center border p-4 h-18 my-4'>
        <div>
          <p>{homes.length} Saved homes</p>
        </div>
        <div>
          <select className='bg-gray-100 border w-full p-2 px-3 font-[Poppins] rounded-md'>
            <option value=''>Showing All</option>
          </select>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {homes.map((data) => (
          // <SavedListingItem key={home.id} data={home} />
          <div
            key={data.id}
            className='border border-b-4 border-b-[#006aff] shadow-lg relative hover:scale-105 duration-300 '
          >
            <AiOutlineClose
              onClick={() => deleteListing(data.id)}
              className='absolute text-white top-2 right-2 text-3xl cursor-pointer'
            />
            <div>
              <img src={data.img} alt='House' />
            </div>
            <div className='p-2'>
              <p className='font-medium text-xl py-1'>
                ${data.price?.toLocaleString()}
              </p>
              <div className='flex justify-between w-[60%] py-1 text-sm'>
                <p>{data.beds} bds</p>
                <p>{data.baths} ba</p>
                <p>{data.sqft?.toLocaleString()} sqft</p>
              </div>
              <p className='text-sm py-1'>{data.address}</p>
              <p className='text-xs text-gray-600 py-1'>
                Listing ZPID: #{data.id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedListings;
