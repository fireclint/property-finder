import { getSuggestedQuery } from '@testing-library/react';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const style = {
  searchBar: `border`,
  searchContainer: `px-2 flex flex-col md:flex-row justify-center items-center`,
  form: `flex justify-between items-center max-w-[680px] w-full border 
    rounded-md text-black bg-gray-100/50`,
  input: `bg-transparent w-full sm:w-[400px] p-2 font-[Poppins] focus:outline-none m-1`,
  icon: `icon text-gray-700`,
  saved: `flex h-full items-center border m-2`,
  iconHeart: `mr-2`,
};

const SearchBar = ({ setAlert, fetchListings }) => {
  const [query, setQuery] = useState('');
  const { user } = useUserAuth();

  const onSubmit = (e) => {
    if (query === '') {
      setAlert('Please enter a valid input');
    } else {
      e.preventDefault();
      fetchListings(query);
      getSuggestedQuery('');
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };


  return (
    <div className={style.searchBar}>
      <div className={style.searchContainer}>
        <form onSubmit={onSubmit} className={style.form}>
          <input
            value={query}
            onChange={onChange}
            type='text'
            placeholder='Searn an Address, City, or ZIP code'
            className={style.input}
          />
          <button type='submit'>
            <AiOutlineSearch size={20} className={style.icon} />
          </button>
        </form>
        <div>
          {user?.email ?           <Link to='/saved-listings'>
            <button className={style.saved}>
              <BsHeart className={style.iconHeart} />
              Saved Listings
            </button>
          </Link> :             <Link onClick={()=> alert('Please sign in to save homes.')} to='/saved-listings'>
            <button className={style.saved}>
              <BsHeart className={style.iconHeart} />
              Saved Listings
            </button>
          </Link>}

        </div>
      </div>
    </div>
  );
};

export default SearchBar;
