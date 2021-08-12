import React from 'react';
import { Link } from 'react-router-dom';
import { SkateSpotReviews } from './SkateSpotReviews';
import { skatespotObstacleImages } from '../../utils/skatespotObstacles';
import { useMediaQuery } from 'react-responsive';

interface Props {
  skatespot: any;
}

export const SkateSpotBottom: React.FC<Props> = ({ skatespot }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className="min-w-300 h-full">
      <div className="w-10/12 max-w-295 mx-auto">
        <div className={`leading-loose mx-auto my-0 ${isDesktopOrLaptop ? 'w-2/3' : 'w-3/4'}`}>
          <div className="flex w-full">
            {/* buttons for writing reviews, adding photos, follow skate spot */}
            <div className={`w-2/3 max-w-295 ${isDesktopOrLaptop ? 'w-2/3' : 'w-full'}`}>
              <div className="border-b border-dashed border-black">
                <div className="mb-5">
                  <Link
                    to={{
                      pathname: `/write-review/${skatespot.name}`,
                      state: { skateSpot: { id: skatespot.id, name: skatespot.name } },
                    }}
                    className={`text-white rounded border-blue-400 bg-blue-400 border-r-2 border-b-2 border-l border-t mb-6 py-2 font-bold hover:bg-blue-200 hover:text-black ${
                      isDesktopOrLaptop ? 'text-base px-6 mr-6' : 'text-xs px-1 mr-3'
                    }`}
                  >
                    Write Review
                  </Link>
                  <Link
                    to={{
                      pathname: '/skatespot-photos/add',
                      state: { skateSpot: skatespot },
                    }}
                    className={`text-white rounded border-blue-400 bg-blue-400 border-r-2 border-b-2 border-l border-t mb-6 mr-6 py-2 font-bold hover:bg-blue-200 hover:text-black ${
                      isDesktopOrLaptop ? 'text-base px-6' : 'text-xs px-1'
                    }`}
                  >
                    Add photo
                  </Link>
                </div>
              </div>
              <div className="border-b border-black border-dashed my-4">
                {/* Header */}
                <div className="text-black font-bold text-xl mb-4">
                  <span>Location</span>
                </div>
                <div className="flex">
                  <div className="mb-5">
                    {/* static map */}
                    <div>
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=300x150&maptype=roadmap&markers=color:red%7C${
                          JSON.parse(skatespot.location).lat
                        },${JSON.parse(skatespot.location).lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                        alt="static-map"
                      />
                    </div>
                    <div className="mt-5">
                      <p className="font-semibold text-base">
                        <span>{skatespot.street}</span>
                      </p>
                      <p className="font-normal text-base">
                        <span>
                          {skatespot.city},&nbsp;{skatespot.state}&nbsp;
                          {skatespot.postalCode}
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* Popular times histogram
                  <div></div> */}
                </div>
              </div>
              {/* Skatespot Obstacles */}
              <h2 className="font-semibold text-lg">Skatespot Obstacles</h2>
              <div className="flex mt-5 mb-10 justify-between border border-gray-100 py-8 px-4 bg-gray-100 rounded w-full shadow-xl">
                {skatespot.skatespotObstacles &&
                  JSON.parse(skatespot.skatespotObstacles).map((obstacle) => {
                    return (
                      <div className="border-gray-100 rounded mx-2 bg-white border-2 shadow-2xl" key={obstacle}>
                        <img src={skatespotObstacleImages[obstacle]} alt="" className="py-4 max-w-44 max-h-20" />
                        <h3 className="text-center italic font-semibold">{obstacle}</h3>
                      </div>
                    );
                  })}
                {/* <div className="border-gray-100 rounded mx-2 bg-white border-2 shadow-2xl" key={obstacle}>
                  <img src={skatespotObstacleImages[obstacle]} alt="" className="py-4 max-w-44 max-h-20" />
                  <h3 className="text-center italic font-semibold">{obstacle}</h3>
                </div> */}
              </div>
              {/* Reviews */}
              <div className="border-t border-black border-dashed">
                <h2 className="text-red-500 font-semibold mt-5 text-lg">Reviews</h2>
                <SkateSpotReviews skateSpotId={skatespot.id} />
              </div>
            </div>
            {/* fixed side panel for directions and photos */}
            {skatespot.website && (
              <div className="w-1/3 max-h-48 sticky ml-12 border rounded border-gray-200 mb-4">
                <div>
                  <span>{skatespot.website}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
