import React from 'react';
import { useGetSkateSpotReviewsQuery } from 'src/generated/graphql';
import SkateSpot1 from '../../assets/SkateSpot1.jpg';
import { ReviewText } from '../components/ReviewText';
import { AverageReviewStars } from '../components/AverageReviewStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div>
      {data?.getSkateSpotReviews &&
        data?.getSkateSpotReviews.map((review) => {
          return (
            <div key={review.id} className="mb-5">
              <div className="flex">
                {/* Profile image */}
                <div className="h-24 w-24">
                  <img src={SkateSpot1} alt="profile-avatar" className="rounded" />
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
              <div className="flex mb-10">
                {review.imageUrls &&
                  JSON.parse(review.imageUrls).map((img: string, idx: number) => {
                    return (
                      <div key={idx} className="max-h-64 w-64 mr-5">
                        <img src={img} alt="" className="rounded" />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};
