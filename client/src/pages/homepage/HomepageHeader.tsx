import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from '../../graphql/reactive-variables/accessToken';
import { Account } from '../components/Account';
// import { useMediaQuery } from 'react-responsive';

export const HomepageHeader: React.FC = () => {
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const value = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(!!accessToken());
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <header>
      {isLoggedIn ? (
        <div className="block">
          <nav>
            <ul className="flex float-left">
              <li
                className={`cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-white`}
              >
                <Link to="/write-review">
                  <span>Write a Review</span>
                </Link>
              </li>
              <li className="cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-white">
                <Link to="/create-skate-spot">
                  <span>Create Skate Spot</span>
                </Link>
              </li>
            </ul>
            <ul className="inline-block float-right">
              <li>
                <TokenContext.Provider value={value}>
                  <Account />
                </TokenContext.Provider>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="block">
          <nav>
            <ul className="inline-block float-right">
              <li className="inline-block">
                <Link
                  to="/login"
                  className="cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-white"
                >
                  Log In
                </Link>
              </li>
              <li className="inline-block">
                <Link
                  to="/register"
                  className="cursor-pointer align-middle text-center font-bold select-none text-sm rounded -mt-0.5 border-solid border-white border-2 pt-2 pb-2 px-7.5 whitespace-nowrap leading-tight transition duration-500 ease-in-out hover:bg-white hover:text-black text-white"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
