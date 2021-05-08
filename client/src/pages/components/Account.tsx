import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from 'react-click-away-listener';
import AccountDropDown from '../homepage/AccountDropDown';

interface Props {}

export const Account: React.FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const clickAwayRef = React.useRef(null);

  const handleClickAway = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="flex">
        <div className="rounded-l-sm rounded-r-none border">
          <div className="p-2 bg-white text-gray-300 hover:bg-gray-100 hover:text-gray-500">
            <Link to="/user-profile">
              <FontAwesomeIcon icon={['fas', 'user']} />
            </Link>
          </div>
        </div>
        <div className="rounded-r-sm roudner-l-none border border-black border-opacity-30">
          <div className="my-auto mx-0 h-full">
            <div
              className="cursor-pointer p-2 text-white bg-black bg-opacity-25 hover:bg-opacity-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon icon={['fas', 'angle-down']} />
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <AccountDropDown />
        </ClickAwayListener>
      )}
    </div>
  );
};
