import React, { useState, useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import Modal from './Modal';
import GoogleMapReact from 'google-map-react';
import IconMarker from './IconMarker';
import logo from '../assets/z-logo.svg';
import { db } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';
import { arrayUnion } from 'firebase/firestore';

const ListItem = ({ item, zoom, listings, center }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [centerObj, setCenter] = useState([]);
  const [like, setLike] = useState(false);
  const [savedHome, setSavedHome] = useState(false);

  const { user } = useUserAuth();

  const listingId = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    setCenter(center);
    if (listings && listings.length > 0) {
      const obj = { lat: listings[0].latitude, lng: listings[0].longitude };
      setCenter(obj);
    }
  }, []);

  const saveListing = async (e) => {
    e.stopPropagation();
    if (user?.email) {
      setSavedHome(true);
      setLike(!like)
      await updateDoc(listingId, {
        savedListings: arrayUnion({
          id: item.zpid,
          img: item.imgSrc,
          price: item.price,
          beds: item.bedrooms,
          baths: item.bathrooms,
          sqft: item.livingArea,
          address: item.address,
        }),
      });
    } else {
      alert('Please sign in to save a home');
    }
    // console.log(`${user?.email} saved listing ID ${item.zpid}`);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        key={item.zpid}
        className='relative w-full border border-b-4 border-b-[#006aff] shadow-md cursor-pointer'
      >
        <img
          className='h-[220px] w-full object-cover'
          src={item.imgSrc}
          alt='/'
        />
        <p onClick={saveListing}>
          {savedHome ? (
            <BsHeartFill
              className='absolute top-4 right-4 z-20 text-white'
              size={20}
            />
          ) : (
            <BsHeart
              className='absolute top-4 right-4 z-20 text-white'
              size={20}
            />
          )}
        </p>
        <div className='p-2'>
          <p className='font-bold text-lg'>${item?.price.toLocaleString()}</p>
          <p className='p-1'>
            {item.bedrooms} bds {item.bathrooms} ba {item.livingArea} sqft{' '}
          </p>
          <p className='text-sm'>{item.address}</p>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='grid sm:grid-cols-2'>
          <div>
            <img src={item.imgSrc} alt='/' />
          </div>

          <div className='flex flex-col px-4'>
            <div className='flex justify-between text-blue-700 border-b pb-4'>
              {/* <p className='text-3xl font-bold'>App.</p> */}
              <div className='w-[200px] p-0 m-0'>
                <img src={logo} alt='/' />
              </div>
              <div
                onClick={saveListing}
                className='flex items-center cursor-pointer'
              >
                {like ? (
                  <BsHeartFill size={20} style={{ marginRight: '8px' }} />
                ) : (
                  <BsHeart size={20} style={{ marginRight: '8px' }} />
                )}

                <p>Save</p>
              </div>
            </div>
            <div className='flex items-end'>
              <p className='font-bold text-4xl pr-4'>
                ${item?.price.toLocaleString()}
              </p>
              <p className='pr-4'>
                <span className='font-bold'>{item.bedrooms}</span>{' '}
                <span className='text-gray-600'>bd</span>
              </p>
              <p className='pr-4'>
                <span className='font-bold'>{item.bathrooms}</span>{' '}
                <span className='text-gray-600'>ba</span>
              </p>
              <p>
                <span className='font-bold'>{item.livingArea}</span>{' '}
                <span className='text-gray-600'>sqft</span>
              </p>
            </div>
            <div className='py-4'>
              <p className='text-lg text-gray-600'>{item.address}</p>
            </div>
            <div className='w-full h-full border relative'>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyAF0xuo7dWefVNZVHHcSAcq61vNAllJ49E',
                }}
                defaultCenter={{ lat: item.latitude, lng: item.longitude }}
                defaultZoom={17}
              >
                <IconMarker lat={item.latitude} lng={item.longitude} />
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListItem;
