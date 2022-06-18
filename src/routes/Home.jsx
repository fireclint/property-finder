import React from 'react'
import Listings from '../components/Listings'
import Map from '../components/Map'
import Search from '../components/Search'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'
import heroImg from '../assets/hero.jpg'

const Home = ({fetchListings, listings, loading}) => {
    const length = listings.length;
    
  return (
    <>
          {/* Conditional Search Bar */}
          {length ? <SearchBar fetchListings={fetchListings} /> : <div className='hidden'></div>}

{/* Hero */}
{!length ? (
  <div className='w-full h-[90vh] relative'>
    <img className='w-full h-full object-cover' src={heroImg} alt='' />
    <div className='w-full h-full absolute top-0 left-0 bg-gray-900/50'></div>
    <div className='absolute top-0 flex justify-center items-center w-full h-full'>
      <Search fetchListings={fetchListings} />
    </div>
  </div>
) : (
  <div>
    {/* APP CONTAINER ---- switch to grid maybe */}
    <div className='flex w-full h-[85vh] '>
      {/* MAP COMPONENT */}
      {listings.length > 0 ? (
        <div className='hidden lg:flex flex-col w-full h-[85vh] mr-2'>
          {!loading ? <Map listings={listings} /> : <Spinner />}
        </div>
      ) : (
        <div></div>
      )}

      {/* LISTINGS */}
      <div className='w-full overflow-auto'>
        <Listings listings={listings} loading={loading} />
      </div>
    </div>
  </div>
)}
    </>
  )
}

export default Home