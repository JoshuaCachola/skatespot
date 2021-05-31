import React from 'react';
import { useGetSkateSpotReviewsQuery } from 'src/generated/graphql';
import SkateSpot1 from '../../assets/SkateSpot1.jpg';
import { ReviewText } from '../components/ReviewText';
import { AverageReviewStars } from '../components/AverageReviewStars';

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
              <div className="flex items-center text-sm mb-5">
                <AverageReviewStars rating={review.rating} />
                {/* Review date */}
                <div className="text-sm font-semibold">
                  <h2>&nbsp;{review.createdAt.slice(0, 10)}</h2>
                </div>
              </div>
              <div className="font-light">
                <ReviewText review={review.review} />
              </div>
              <div className="flex">
                {review.imageUrls &&
                  JSON.parse(review.imageUrls).map((img: string, idx) => {
                    return (
                      <div key={idx} className="h-44 w-44 mr-5">
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
