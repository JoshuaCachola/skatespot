import React from 'react';

enum reviewsDistributionValues {
  oneStar = 1,
  twoStar = 2,
  threeStar = 3,
  fourStar = 4,
  fiveStar = 5,
}

export const AverageReviewStars = ({ reviewsDistribution, reviewsCount }) => {
  const [average, setAverage] = React.useState<number>(0);
  React.useEffect(() => {
    let total: number = 0;
    for (const key in reviewsDistribution) {
      const value = reviewsDistribution[key];
      total += value * reviewsDistributionValues[key];
    }
    setAverage(total / reviewsCount);
  }, []);

  return (
    <div>
      <h1>{average}</h1>
    </div>
  );
};
