import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='py-16'>
      <div className='max-w-[500px] mx-auto sm:border rounded-md sm:shadow-lg p-4'>
        <div>
          <h1 className='text-4xl font-bold text-gray-600 text-center mb-8'>
            Register
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
                // onClick={register}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <p className='text-center m-4 cursor-pointer'>
          Already have an account?
          <Link to='/signin'>
            <span className='text-[#006aff]'> Sign in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
