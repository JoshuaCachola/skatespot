import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

interface Props {}

export const Footer: React.FC<Props> = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });

  return (
    <div className="table-row align-bottom bottom-0 w-screen bg-gray-200 z-20">
      <div className="flex flex-col items-end w-screen py-2">
        <div className={`flex text-black text-middle mr-6 ${isMobile ? 'text-base' : 'text-lg'}`}>
          <Link to={{ pathname: 'https://www.linkedin.com/in/joshua-cachola-b6bab9194/' }} target="_blank">
            <h6>
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
              <span>&nbsp;LinkedIn</span>
            </h6>
          </Link>
        </div>
        <div className={`flex text-black text-middle mr-9 ${isMobile ? 'text-base' : 'text-lg'}`}>
          <Link to={{ pathname: 'https://github.com/JoshuaCachola' }} target="_blank">
            <h6>
              <FontAwesomeIcon icon={['fab', 'github']} />
              <span>&nbsp;Github</span>
            </h6>
          </Link>
        </div>
        <div className={`flex text-black text-middle mr-5 ${isMobile ? 'text-base' : 'text-lg'}`}>
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
