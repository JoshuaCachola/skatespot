import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {}

export const ReviewStar: React.FC<Props> = () => {
  return (
    <div className="flex">
      <div className="mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1">
        <span>
          <FontAwesomeIcon icon={['fas', 'star']} />
        </span>
      </div>
    </div>
  );
};
