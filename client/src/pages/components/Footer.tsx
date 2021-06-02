import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <div className="table-row align-bottom bottom-0 w-screen bg-gradient-to-t from-gray-300 via-gray-200 z-20">
      <div className="flex justify-evenly w-screen py-6">
        <div className="text-xl flex text-black text-middle">
          <Link to={{ pathname: 'https://www.linkedin.com/in/joshua-cachola-b6bab9194/' }} target="_blank">
            <h6>
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
              <span>&nbsp;LinkedIn</span>
            </h6>
          </Link>
        </div>
        <div className="text-xl flex text-black text-middle">
          <Link to={{ pathname: 'https://github.com/JoshuaCachola' }} target="_blank">
            <h6>
              <FontAwesomeIcon icon={['fab', 'github']} />
              <span>&nbsp;Github</span>
            </h6>
          </Link>
        </div>
        <div className="text-xl flex text-black text-middle">
          <Link to={{ pathname: 'https://joshuacachola.github.io' }} target="_blank">
            <h6>
              <FontAwesomeIcon icon={['fas', 'window-maximize']} />
              <span>&nbsp;Portfolio</span>
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
};
