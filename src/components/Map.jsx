import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import IconMarker from './IconMarker';
import InfoBox from './InfoBox';

const Map = ({ center, zoom, listings }) => {
  const [centerObject, setCenter] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setSelected(null);
  };

  useEffect(() => {
    setCenter(center);
    if (listings && listings.length > 0) {
      const obj = { lat: listings[0].latitude, lng: listings[0].longitude };
      setCenter(obj);
    }
  }, []);

  return (
    <>
      {selected && (
        <InfoBox
          className='flex flex-col'
          info={selected}
          handleClick={handleClick}
        />
      )}

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={centerObject}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {listings.map((item) => (
          <IconMarker
            key={item.zpid}
            lat={item.latitude}
            lng={item.longitude}
            onClick={() => {
              setSelected({
                id: item.zpid,
                price: item.price,
                img: item.imgSrc,
                bed: item.bedrooms,
                bath: item.bathrooms,
                sqft: item.livingArea,
                address: item.address,
              });
            }}
          />
        ))}
      </GoogleMapReact>
    </>
  );
};

Map.defaultProps = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 11,
};

export default Map;
