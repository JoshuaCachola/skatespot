import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <div className="border-t border-white m-0 p-0 w-screen absolute bottom-0 bg-gradient-to-t from-gray-300 via-gray-200 flex justify-evenly py-6">
      <div className="text-2xl flex text-gray-800 text-middle">
        <h6>
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
          <span>&nbsp;LinkedIn</span>
        </h6>
      </div>
      <div className="text-2xl flex text-gray-800 text-middle">
        <h6>
          <FontAwesomeIcon icon={['fab', 'github']} />
          <span>&nbsp;Github</span>
        </h6>
      </div>
      <div className="text-2xl flex text-gray-800 text-middle">
        <h6>
          <FontAwesomeIcon icon={['fas', 'window-maximize']} />
          <span>&nbsp;Portfolio</span>
        </h6>
      </div>
    </div>
  );
};
