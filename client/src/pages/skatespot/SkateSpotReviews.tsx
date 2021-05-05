import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetSkateSpotReviewsQuery } from 'src/generated/graphql';
import SkateSpot1 from '../../assets/SkateSpot1.jpg';
import { ReviewText } from '../components/ReviewText';

interface Props {
  skateSpotId: number;
}

export const SkateSpotReviews: React.FC<Props> = ({ skateSpotId }) => {
  const { data, loading, error } = useGetSkateSpotReviewsQuery({
    variables: { skateSpotId },
  });

  console.log(skateSpotId);

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
              <div className="flex items-center mb-5">
                <div className="text-base text-black font-bold">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'star']} />
                    <FontAwesomeIcon icon={['fas', 'star']} />
                    <FontAwesomeIcon icon={['fas', 'star']} />
                    <FontAwesomeIcon icon={['fas', 'star']} />
                    <FontAwesomeIcon icon={['fas', 'star']} />
                  </span>
                </div>
                {/* Review date */}
                <div className="text-sm">
                  <span>&nbsp;04/28/2021</span>
                </div>
              </div>
              <div className="break-words font-light">
                <ReviewText review={review.review} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
