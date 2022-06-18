import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';


const Account = () => {
  const {user,logOut} = useUserAuth()


  const handleLogout = async () => {
    try {
      await logOut()
    } catch (err) {
      console.log(err.message)
    }
  }




  return (
    <div className='max-w-[1240px] mx-auto px-4 py-16'>
      <h1 className='text-3xl font-bold text-gray-700'>Account</h1>
      <div className='w-full border p-4 my-4'>
        <p className='py-2'><span className='font-bold'>Username/Email: </span> {user?.email}</p>
      </div>
      <div>
        <button onClick={handleLogout} className='border p-4'>Log out</button>
      </div>
    </div>
  );
};

export default Account;
