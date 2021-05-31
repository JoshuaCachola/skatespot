import React from 'react';
import { Link } from 'react-router-dom';
import { SkateSpotReviews } from './SkateSpotReviews';

interface Props {
  skatespot: any;
}

export const SkateSpotBottom: React.FC<Props> = ({ skatespot }) => {
  return (
    <div className="min-w-300">
      <div className="max-w-295 mx-auto my-0">
        <div className="leading-loose mx-auto my-0 w-2/3">
          <div className="flex w-full">
            {/* buttons for writing reviews, adding photos, follow skate spot */}
            <div className="w-2/3 max-w-295">
              <div className="border-b border-black">
                <div className="mb-5">
                  <Link
                    to={{
                      pathname: `/write-review/${skatespot.name}`,
                      state: { skateSpot: { id: skatespot.id, name: skatespot.name } },
                    }}
                    className="text-white rounded border-red-500 bg-red-500 border mb-6 mr-6 py-2 px-6 font-bold"
                  >
                    Write Review
                  </Link>
                  <Link
                    to={{
                      pathname: '/skatespot-photos/add',
                      state: { skatespot: skatespot },
                    }}
                    className="text-white rounded border-red-500 bg-red-500 border mb-6 mr-6 py-2 px-6 font-bold"
                  >
                    Add photo
                  </Link>
                </div>
              </div>
              <div className="border-b border-black my-4">
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
                  {/* Popular times histogram */}
                  <div></div>
                </div>
              </div>
              {/* Reviews */}
              <SkateSpotReviews skateSpotId={skatespot.id} />
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
