import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

const ratingKeys = {
  1: 'oneStar',
  2: 'twoStar',
  3: 'threeStar',
  4: 'fourStar',
  5: 'fiveStar',
};

export const ReviewStars = ({ setFieldValue }) => {
  const [rating, setRating] = React.useState<number>(0);
  const oneStar = useRef<HTMLDivElement>(null);
  const twoStar = useRef<HTMLDivElement>(null);
  const threeStar = useRef<HTMLDivElement>(null);
  const fourStar = useRef<HTMLDivElement>(null);
  const fiveStar = useRef<HTMLDivElement>(null);

  const stars = React.useMemo(() => [oneStar, twoStar, threeStar, fourStar, fiveStar], [
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
  ]);

  React.useEffect(() => {
    for (let i = 0; i < rating; i++) {
      stars[i].current!.style.backgroundColor = 'red';
    }
  }, [rating, stars]);

  const handleMouseOverStar = (starHovered) => {
    for (let i = 0; i < starHovered; i++) {
      stars[i].current!.style.backgroundColor = 'red';
    }
  };

  const handleMouseLeaveStar = (starHovered) => {
    if (rating >= starHovered) {
      return;
    }

    let grayStars: number = 0;

    if (starHovered > rating) {
      grayStars = rating;
    }
    for (grayStars; grayStars < stars.length; grayStars++) {
      stars[grayStars].current!.style.backgroundColor = 'gray';
    }
  };

  const handleStarClick = (numberOfStars) => {
    setRating(numberOfStars);
    console.log(ratingKeys[numberOfStars]);
    setFieldValue('rating', ratingKeys[numberOfStars]);
    for (let i = 0; i < stars.length; i++) {
      if (i < numberOfStars) {
        stars[i].current!.style.backgroundColor = 'red';
      } else {
        stars[i].current!.style.backgroundColor = 'gray';
      }
    }
  };

  return (
    <div className="flex text-2xl text-gray-500 font-bold m-4">
      <div className="flex">
        {stars.map((star, idx) => {
          return (
            <div
              className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1"
              onMouseOver={() => handleMouseOverStar(idx + 1)}
              onMouseLeave={() => handleMouseLeaveStar(idx + 1)}
              onClick={() => handleStarClick(idx + 1)}
              ref={star}
              key={idx + 1}
            >
              <span>
                <FontAwesomeIcon icon={['fas', 'star']} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
