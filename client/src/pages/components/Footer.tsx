import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

interface Props {}

export const Footer: React.FC<Props> = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });

  return (
    <div className="table-row align-bottom w-full bg-gray-200 z-20 border-t border-r-4 border-l border-black">
      <div className="flex flex-col items-end w-screen py-2">
        <div
          className={`flex text-black text-middle mr-6 hover:text-blue-400 font-thin ${
            isMobile ? 'text-base' : 'text-lg'
          }`}
        >
          <Link to={{ pathname: 'https://www.linkedin.com/in/joshua-cachola-b6bab9194/' }} target="_blank">
            <h6>
              <span className="text-2xl text-blue-400">
                <FontAwesomeIcon icon={['fab', 'linkedin']} />
              </span>
              <span>&nbsp;LinkedIn</span>
            </h6>
          </Link>
        </div>
        <div
          className={`flex text-black text-middle mr-9 hover:text-blue-400 font-thin ${
            isMobile ? 'text-base' : 'text-lg'
          }`}
        >
          <Link to={{ pathname: 'https://github.com/JoshuaCachola' }} target="_blank">
            <h6>
              <span className="text-2xl text-blue-400">
                <FontAwesomeIcon icon={['fab', 'github']} />
              </span>
              <span>&nbsp;Github</span>
            </h6>
          </Link>
        </div>
        <div
          className={`flex text-black text-middle mr-6 hover:text-blue-400 font-thin ${
            isMobile ? 'text-base' : 'text-lg'
          }`}
        >
          <Link to={{ pathname: 'https://joshuacachola.github.io' }} target="_blank">
            <h6>
              <span className="text-2xl text-blue-400">
                <FontAwesomeIcon icon={['fas', 'window-maximize']} />
              </span>
              <span>&nbsp;Portfolio</span>
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
};
