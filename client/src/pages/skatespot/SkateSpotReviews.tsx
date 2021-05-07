import React from 'react';
import { useGetSkateSpotReviewsQuery } from 'src/generated/graphql';
import SkateSpot1 from '../../assets/SkateSpot1.jpg';
import { ReviewText } from '../components/ReviewText';
import { AverageReviewStars } from '../components/AverageReviewStars';

interface Props {
  skateSpotId: number;
}

export const SkateSpotReviews: React.FC<Props> = ({ skateSpotId }) => {
  const { data, loading, error } = useGetSkateSpotReviewsQuery({
    variables: { skateSpotId },
  });

  console.log(data?.getSkateSpotReviews);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }
  return (
    <div>
      {!loading &&
        data?.getSkateSpotReviews.map((review) => {
          return (
            <div key={review.id} className="mb-5">
              <div className="flex">
                {/* Profile image */}
                <div className="rounded h-24 w-24">
                  <img src={SkateSpot1} alt="profile-avatar" />
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
              <div className="flex items-center text-sm mb-5">
                <AverageReviewStars rating={review.rating} />
                {/* Review date */}
                <div className="text-sm">
                  <span>&nbsp;04/28/2021</span>
                </div>
              </div>
              <div className="font-light">
                <ReviewText review={review.review} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
