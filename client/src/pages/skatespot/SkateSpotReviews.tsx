import React from 'react';
import { useGetSkateSpotReviewsQuery } from 'src/generated/graphql';
import { ReviewText } from '../components/ReviewText';
import { AverageReviewStars } from '../components/AverageReviewStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReviewImages } from '../components/ReviewImages';

interface Props {
  skateSpotId: number;
}

export const SkateSpotReviews: React.FC<Props> = ({ skateSpotId }) => {
  const { data } = useGetSkateSpotReviewsQuery({
    variables: { skateSpotId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  console.log(data?.getSkateSpotReviews);

  return (
    <div className="mt-5">
      {data?.getSkateSpotReviews &&
        data?.getSkateSpotReviews.map((review) => {
          return (
            <div key={review.id} className="mb-5 border-b">
              <div className="flex">
                {/* Profile image */}
                <div className="h-24 w-24">
                  <img
                    src={review.user.profilePicture}
                    alt="profile-avatar"
                    className="rounded border-b-4 border-r-4 border-t border-l border-black"
                  />
                </div>
                {/* User information */}
                <div className="ml-2">
                  {/* username */}
                  <div className="font-bold text-base">
                    <span>{review.user.username}</span>
                  </div>
                  <div className="text-sm">
                    <span>San Jose, CA</span>
                  </div>
                  {/* Add reviews images */}
                  <div></div>
                </div>
              </div>
              {/* User rating */}
              <div className="flex items-center text-sm mb-2">
                <AverageReviewStars rating={review.rating} />
                {/* Review date */}
                <div className="text-sm font-medium">
                  <h2>&nbsp;{review.createdAt.slice(0, 10)}</h2>
                </div>
              </div>
              {JSON.parse(review.imageUrls).length ? (
                <div className="text-black text-lg mb-4 align-middle flex">
                  <FontAwesomeIcon icon={['fas', 'image']} />
                  <span className="text-sm">
                    &nbsp;{JSON.parse(review.imageUrls).length}&nbsp;
                    {JSON.parse(review.imageUrls).length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div className="font-light">
                <ReviewText review={review.review} />
              </div>
              <ReviewImages images={JSON.parse(review.imageUrls)} />
            </div>
          );
        })}
    </div>
  );
};
