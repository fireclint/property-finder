import React from 'react';
import spinner from '../assets/spinner.gif';

const style = {
  spinner: `w-[200px] m-auto block`,
  heading: `text-center text-xl`
}

const Spinner = () => 
  <>
    <img src={spinner} alt='Loading...' className={style.spinner} /><h1 className={style.heading}>Loading Data..</h1>
  </>;

export default Spinner;
