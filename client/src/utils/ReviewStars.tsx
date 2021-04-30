import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {}

export const ReviewStars: React.FC<Props> = () => {
  return (
    <div className="flex text-2xl text-gray-500 font-bold m-4">
      <div className="flex">
        <div className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1 hover:bg-red-600 hover:border-red-600">
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1">
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1">
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1">
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
        <div className="cursor-pointer mr-1 border rounded border-gray-500 bg-gray-500 text-white p-1">
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </div>
      </div>
    </div>
  );
};
