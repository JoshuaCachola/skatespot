import React, { memo, useCallback, useState} from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Props {
  locations: Array<any> | undefined
}

const containerStyle = {
  width: '100%',
  height: '100vh'
};

// const locations = [
//     { id: "place1", pos: { lat: 39.09366509575983, lng: -94.58751660204751 } },
//     { id: "place2", pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
//     { id: "place3", pos: { lat: 39.07602397235644, lng: -94.5184089401211 } }
//   ];

const Map: React.FC<Props> = ({locations}) => {
  const [map, setMap] = useState<any>(null);
  // const [center, setCenter] = useState<any>(null);
  console.log(locations);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  });

  const onLoad = useCallback((mapInstance) => {
    if (!locations) {
      return;
    }
    let lat: number = 0;
    let lng: number = 0;

    locations.forEach(({location}) => {
      location = JSON.parse(location);
      lat += location.lat;
      lng += location.lng
    });

    lat /= locations.length;
    lng /= locations.length;
    mapInstance.setCenter({lat, lng});
    
    setMap(mapInstance);
  }, [locations]);

  const onUnmount = useCallback(() => {
    if (!map) {
      setMap(null);
    }
  }, [map]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={9}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations && locations.map(({location}, idx) => {
        return (
          <Marker
            key={idx}
            position={JSON.parse(location)}

          />
        )
      })}
    </GoogleMap>
  ): <></>;
};

export default memo(Map);