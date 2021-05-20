import React, { memo, useCallback, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { AverageReviewStars } from './AverageReviewStars';
import { useHistory } from 'react-router-dom';

interface Props {
  locations: Array<any> | undefined;
}

const containerStyle = {
  width: '100%',
  height: '100vh',
};

// const locations = [
//     { id: "place1", pos: { lat: 39.09366509575983, lng: -94.58751660204751 } },
//     { id: "place2", pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
//     { id: "place3", pos: { lat: 39.07602397235644, lng: -94.5184089401211 } }
//   ];

const Map: React.FC<Props> = ({ locations }) => {
  const [map, setMap] = useState<any>(null);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [markerMap, setMarkerMap] = useState<any>({});
  const history = useHistory();

  React.useEffect(() => {
    return () => {
      setMap(null);
      setSelectedPlace({});
      setMarkerMap({});
      setIsInfoOpen(false);
    };
  }, []);

  const handleMouseOver = (skatespot) => {
    setSelectedPlace(skatespot);
    setIsInfoOpen(true);
  };

  const handleMouseOut = () => {
    setIsInfoOpen(false);
    setSelectedPlace({});
  };

  const handleOnClick = (skatespot) => {
    console.log(skatespot);
    history.push({ pathname: `/skate-spot/${skatespot.name}`, state: { skatespot } });
    // return <Redirect to={{ pathname: `/skate-spot/${skatespot.name}`, state: { skatespot } }} />;
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  const markerLoadHandler = (marker, name) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [name]: marker };
    });
  };

  const onLoad = useCallback(
    (mapInstance) => {
      if (!locations) {
        return;
      }
      let lat: number = 0;
      let lng: number = 0;

      locations.forEach(({ location }) => {
        location = JSON.parse(location);
        lat += location.lat;
        lng += location.lng;
      });

      lat /= locations.length;
      lng /= locations.length;
      mapInstance.setCenter({ lat, lng });

      setMap(mapInstance);
    },
    [locations],
  );

  const onUnmount = useCallback(() => {
    if (!map) {
      setMap(null);
    }
  }, [map]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} zoom={9} onLoad={onLoad} onUnmount={onUnmount}>
      {locations &&
        locations.map((skatespot, idx) => {
          return (
            <Marker
              key={idx}
              position={JSON.parse(skatespot.location)}
              animation={2}
              onLoad={(marker) => markerLoadHandler(marker, skatespot.name)}
              onMouseOver={() => handleMouseOver(skatespot)}
              onMouseOut={handleMouseOut}
              onClick={() => handleOnClick(skatespot)}
            />
          );
        })}

      {isInfoOpen && selectedPlace && (
        <InfoWindow anchor={markerMap[selectedPlace.name]}>
          <>
            <div className="max-h-40 w-52 flex justify-center">
              <img src={JSON.parse(selectedPlace.imageUrls)[0]} alt="" className="object-cover align-middle" />
            </div>
            <div className="font-bold text-lg my-2">{selectedPlace.name}</div>
            <div className="flex text-sm my-2">
              <AverageReviewStars
                reviewsCount={selectedPlace.reviewsCount}
                reviewsDistribution={JSON.parse(selectedPlace.reviewsDistribution)}
              />
              <span className="text-lg font-semibold">&nbsp;{selectedPlace.reviewsCount}</span>
            </div>
            <div className="font-light my-2">{selectedPlace.categoryName}</div>
          </>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
