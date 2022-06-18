import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const style = {
  form: `flex justify-between items-center max-w-[700px] mx-2 w-full border p-1
  rounded-md text-black bg-gray-100/90`,
  input: `bg-transparent w-full p-2 font-[Poppins] focus:outline-none`,
  icon: `icon text-gray-700`,
};

const Search = ({ setAlert, fetchListings }) => {
  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === '') {
      setAlert('Please enter something');
    } else {
      fetchListings(query);
      setQuery('');
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit} className={style.form}>
        <input
          value={query}
          onChange={onChange}
          type='text'
          placeholder='Searn an Address, City, or ZIP code'
          className={style.input}
        />
        <button type='submit'>
          <AiOutlineSearch size={30} className={style.icon} />
        </button>
      </form>
    </>
  );
};

export default Search;
