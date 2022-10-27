import React, { useState, Fragment } from 'react';
import logo from '../assets/z-logo.svg';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useUserAuth } from '../context/UserAuthContext';
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';

const style = {
  nav: `max-w-[1240px] mx-auto w-full h-20 grid grid-cols-2 md:grid-cols-3 justify-center items-center px-4`,
  logo: `w-[150px] md:m-auto `,
  ul: `hidden md:flex`,
  li: `pr-4 text-sm`,
  buttonWrapper: `hidden md:flex`,
  hamburgerWrapper: `md:hidden flex justify-end cursor-pointer`,
  mobileMenu: `fixed md:hidden top-20 left-0 w-[80%] h-screen bg-white z-10 ease-in-out duration-500 shadow-lg p-4`,
  mobileMenuToggle: `fixed md:hidden top-20 left-[-100%] h-screen ease-in-out duration-500`,
  mobileUl: `flex flex-col text-gray-800p py-4`,
  mobileLi: `text-center p-4 border-b border-gray-300 mx-6`,
  mobileButtonWrapper: `my-8`,
  mobileButton: `border bg-[#006aff] text-white my-4 w-full`,
  mobileButtonOutline: `border bg-transparent border-[#006aff] text-[#006aff] w-full`,
};

const Navbar = () => {
  const { user, logOut } = useUserAuth();

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    setNav(!nav);
    try {
      await logOut();
      console.log('logged out');
    } catch (err) {
      console.log(err.message);
    }
    if (window.innerWidth >= 768) {
      setNav(false);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className={style.nav}>
      <ul className={style.ul}>
        <li className={style.li}>Buy</li>
        <li className={style.li}>Rent</li>
        <li className={style.li}>Sell</li>
        <li className={style.li}>Loans</li>
        <li className={style.li}>Agents</li>
      </ul>
      <div>
        <Link to='/'>
          <img className={style.logo} src={logo} alt='Willow Logo' />
        </Link>
      </div>

      {/* signin / Current User Wrapper */}
      <div className='md:flex hidden justify-end'>
        {user ? (
          <div className='flex-col'>
            <Menu as='div' className='relative inline-block text-left z-20'>
              <div>
                <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#006aff]'>
                  Welcome, {user?.email}
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='/saved-listings'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Saved Listings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='/account'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Account
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={handleLogout}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </p>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div className={style.buttonWrapper}>
            <ul className={style.ul}>
              <Link to='/signin'>
                <li className={style.li}>Sign In</li>
              </Link>
              <Link to='/signup'>
                <li className={style.li}>Register</li>
              </Link>
            </ul>
          </div>
        )}
      </div>

      {/* Hamburger Menu */}
      <div onClick={handleNav} className={style.hamburgerWrapper}>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div className={nav ? style.mobileMenu : style.mobileMenuToggle}>
        <ul className={style.mobileUl}>
          <Link to='/'>
            <li onClick={() => setNav(!nav)} className={style.mobileLi}>
              Search
            </li>
          </Link>
          <li className={style.mobileLi}>Rent</li>
          <li className={style.mobileLi}>Sell</li>
          <li className={style.mobileLi}>Loans</li>
          <li className={style.mobileLi}>Agents</li>
        </ul>
        {user ? (
          <ul className={style.mobileUl}>
            <p className='text-center font-bold pt-2'>USER</p>
            <Link to='/account'>
              <li onClick={() => setNav(!nav)} className={style.mobileLi}>
                Account
              </li>
            </Link>
            <Link to='/saved-listings'>
              <li onClick={() => setNav(!nav)} className={style.mobileLi}>
                Saved Listings
              </li>
            </Link>
          </ul>
        ) : null}

        <div>
          {user ? (
            <div className='flex flex-col justify-center w-full p-4 text-sm'>
              <p className='text-center m-4'>Welcome, {user?.email}</p>
              <button
                onClick={handleLogout}
                className={style.mobileButtonOutline}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <div className={style.mobileButtonWrapper}>
                <Link to='/signin'>
                  <button
                    onClick={() => setNav(!nav)}
                    className={style.mobileButton}
                  >
                    Sign In
                  </button>
                </Link>
                <Link to='/signup'>
                  <button
                    onClick={() => setNav(!nav)}
                    className={style.mobileButtonOutline}
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className='flex mx-auto px-4 pt-12 w-full justify-between text-gray-600'>
          <FaFacebook size={30} />
          <FaTwitter size={30} />
          <FaInstagram size={30} />
          <FaPinterest size={30} />
          <FaGoogle size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
