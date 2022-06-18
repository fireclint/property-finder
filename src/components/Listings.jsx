import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import ListItem from './ListItem';

const style= {
  container: `grid sm:grid-cols-2 gap-2 scrollbar-hide`
}

const Listings = ({ listings, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid sm:grid-cols-2 gap-2 w-full scrollbar-hide'>
        {listings.map((item) => (
          <ListItem key={item.zpid} item={item} />
        ))}
      </div>
    );
  }
};

export default Listings;
