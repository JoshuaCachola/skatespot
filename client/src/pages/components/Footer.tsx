import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <div className="border-t border-white m-0 p-0 w-screen fixed bottom-0 bg-gradient-to-t from-gray-300 via-gray-200 flex justify-evenly py-6">
      <div className="text-xl flex text-gray-800 text-middle">
        <Link to={{ pathname: 'https://www.linkedin.com/in/joshua-cachola-b6bab9194/' }} target="_blank">
          <h6>
            <FontAwesomeIcon icon={['fab', 'linkedin']} />
            <span>&nbsp;LinkedIn</span>
          </h6>
        </Link>
      </div>
      <div className="text-xl flex text-gray-800 text-middle">
        <Link to={{ pathname: 'https://github.com/JoshuaCachola' }} target="_blank">
          <h6>
            <FontAwesomeIcon icon={['fab', 'github']} />
            <span>&nbsp;Github</span>
          </h6>
        </Link>
      </div>
      <div className="text-xl flex text-gray-800 text-middle">
        <Link to={{ pathname: 'https://joshuacachola.github.io' }} target="_blank">
          <h6>
            <FontAwesomeIcon icon={['fas', 'window-maximize']} />
            <span>&nbsp;Portfolio</span>
          </h6>
        </Link>
      </div>
    </div>
  );
};
