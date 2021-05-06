import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

enum reviewsDistributionValues {
  oneStar = 1,
  twoStar = 2,
  threeStar = 3,
  fourStar = 4,
  fiveStar = 5,
}

interface Props {
  rating?: number;
  reviewsDistribution?: any;
  reviewsCount?: number;
}

export const AverageReviewStars: React.FC<Props> = ({ rating, reviewsDistribution, reviewsCount }) => {
  const [average, setAverage] = React.useState<number>(0);
  const createStarReview = React.useCallback(() => {
    let stars: Array<any> = [];
    for (let i = 0; i < Math.floor(average); i++) {
      const star = (
        <div className="cursor-pointer mr-1 border rounded border-red-500 bg-red-500 text-white p-1">
          <FontAwesomeIcon icon={['fas', 'star']} />
        </div>
      );
      stars.push(star);
    }

    if (average % 1 !== 0) {
      const star = (
        <div className="cursor-pointer mr-1 rounded border-gray-500 bg-gray-500 text-white">
          <div className="w-1/2 bg-red-500 h-full border-red-500 box-border border p-1 rounded-l-md">
            <FontAwesomeIcon icon={['fas', 'star']} />
          </div>
        </div>
      );
      stars.push(star);
    }

    for (let i = Math.ceil(average); i < 5; i++) {
      const star = (
        <div className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1">
          <FontAwesomeIcon icon={['fas', 'star']} />
        </div>
      );
      stars.push(star);
    }
    return stars;
  }, [average]);

  React.useEffect(() => {
    if (reviewsCount && reviewsDistribution) {
      let total: number = 0;
      for (const key in reviewsDistribution) {
        const value = reviewsDistribution[key];
        total += value * reviewsDistributionValues[key];
      }
      setAverage(total / reviewsCount);
    } else if (rating) {
      setAverage(rating);
    }
  }, [rating, reviewsCount, reviewsDistribution, createStarReview]);

  return (
    <>
      {average &&
        createStarReview().map((star, idx) => {
          return <div key={idx}>{star}</div>;
        })}
    </>
  );
};
