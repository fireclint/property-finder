import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { logIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleGoogleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await googleSignIn();
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.message);
  //     console.log(err);
  //   }
  //   console.log('HEyyyy ' + user)
  // };

  return (
    <div className='py-16'>
      <div className='max-w-[500px] mx-auto sm:border rounded-md sm:shadow-lg p-4'>
        <h1 className='text-4xl font-bold text-gray-600 text-center mb-8'>
          Sign In
        </h1>
        {error && (
          <p className='text-center border bg-red-300 p-2 m-2'>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-sm font-bold text-gray-700 mb-2'>
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-100 w-full p-3 font-[Poppins] rounded-md mb-6'
              type='email'
              placeholder='Enter email'
              autoComplete='email'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-bold text-gray-700 mb-2'>
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-100 w-full p-3 font-[Poppins] rounded-md mb-6'
              type='password'
              placeholder='Enter password'
            />
          </div>
          <div>
            <button
              className='bg-[#006aff] text-white my-4 w-full'
              // disabled={loading || currentUser}
              // onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
        {/* <div className='border-t-2 py-4'>
          <GoogleButton onClick={handleGoogleSignIn} className='g-button' />
        </div> */}
      </div>
      <div>
        <p className='text-center m-4 cursor-pointer'>
          Don't have an account?
          <Link to='/signup'>
            <span className='text-[#006aff]'> Create one.</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
