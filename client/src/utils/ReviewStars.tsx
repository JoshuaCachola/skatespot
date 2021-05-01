import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

interface Props {}

export const ReviewStars: React.FC<Props> = () => {
  const [rating, setRating] = useState<number>(0);
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
    // const starHovered = parseInt(e.target.id);
    // console.log(starHovered);
    if (rating >= starHovered) {
      return;
    }

    let i: number = 0;

    if (starHovered > rating) {
      i = rating;
    }
    for (i; i < stars.length; i++) {
      stars[i].current!.style.backgroundColor = 'gray';
    }
  };

  const handleStarClick = (numberOfStars) => {
    setRating(numberOfStars);
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
        <div
          className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1"
          onMouseOver={() => handleMouseOverStar(1)}
          onMouseLeave={() => handleMouseLeaveStar(1)}
          onClick={() => handleStarClick(1)}
          ref={oneStar}
        >
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div
          className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1"
          onMouseOver={() => handleMouseOverStar(2)}
          onMouseLeave={() => handleMouseLeaveStar(2)}
          onClick={() => handleStarClick(2)}
          ref={twoStar}
        >
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div
          className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1"
          onMouseOver={() => handleMouseOverStar(3)}
          onMouseLeave={() => handleMouseLeaveStar(3)}
          onClick={() => handleStarClick(3)}
          ref={threeStar}
        >
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div
          className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1"
          onMouseOver={() => handleMouseOverStar(4)}
          onMouseLeave={() => handleMouseLeaveStar(4)}
          onClick={() => handleStarClick(4)}
          ref={fourStar}
        >
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div
          className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1"
          onMouseOver={() => handleMouseOverStar(5)}
          onMouseLeave={() => handleMouseLeaveStar(5)}
          onClick={() => handleStarClick(5)}
          ref={fiveStar}
        >
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
      </div>
    </div>
  );
};
