import React from 'react';
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto px-4 py-16 text-gray-700'>
      <div className='flex flex-col'>
        <div>
          <ul className='flex w-full justify-around'>
            <li>About</li>
            <li>Zestimate</li>
            <li>Investing</li>
            <li>Advertise</li>
            <li>Help</li>
          </ul>
        </div>
        <div className='flex max-w-[300px] mx-auto pt-12 w-full justify-between'>
          <FaFacebook size={30} className='' />
          <FaTwitter size={30} className='' />
          <FaInstagram size={30} className='' />
          <FaPinterest size={30} className='' />
          <FaGoogle size={30} className='' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
