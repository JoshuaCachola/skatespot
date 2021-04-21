import React, { memo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface Props {

}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map: React.FC<Props> = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  });
  // const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  // const [mapRef, setMapRef] = useState<any>(null);

  // const onLoad = useCallback((map) => {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMapRef(map);
  // }, []);

  // const onUnmount = useCallback((map) => {
  //   setMapRef(null);
  // }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={14}
      center={{ lat: 44.076613, lng: -98.362239833 }}
      onLoad={() => console.log('loaded')}
    >

    </GoogleMap>
  ): <></>;
};

export default memo(Map);