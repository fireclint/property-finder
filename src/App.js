import { useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Home from './routes/Home';
import Navbar from './components/Navbar';
import Signup from './routes/Signup';
import Signin from './routes/Signin';
import SavedListings from './routes/SavedListings';
import Account from './routes/Account';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(2);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  const host = 'zillow-com1.p.rapidapi.com';
  const key = '7247b66e84msh6ae2236865b69fap11e4e8jsnede3042b181a';

  const length = listings.length;
  // console.log(length + ' this is the length');


  const fetchListings = (query) => {
    setLoading(true);
    var options = {
      method: 'GET',
      url: `https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${query}&home_type=Houses`,
      // params: {location: 'plano, tx', page: '1', home_type: 'Houses'},
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    };

    axios
      .request(options)
      .then((response) => {
        let props = response.data.props;

        props = props.sort((a, b) => {
          //  console.log('A', a);
          if (sortOrder === 1) {
            return a.price > b.price ? 1 : -1;
          } else {
            return a.price < b.price ? 1 : -1;
          }
        });
        setListings(props);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <UserAuthContextProvider>
      <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                fetchListings={fetchListings}
                listings={listings}
                loading={loading}
              />
            }
          />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/saved-listings' element={<ProtectedRoute><SavedListings/></ProtectedRoute>} />
          <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>} />
        </Routes>
      </UserAuthContextProvider>
      <Footer />
    </>
  );
}

export default App;
