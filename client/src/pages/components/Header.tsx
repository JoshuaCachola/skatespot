import React from 'react';
import { Link } from 'react-router-dom';
import { TokenContext } from 'src/utils/TokenContext';
import { useIsLoggedIn } from 'src/utils/useIsLoggedIn';
import Account from './Account';
import SearchForm from './search/SearchForm';

interface Props {}

// todo
//  - align logo middle

export const Header: React.FC<Props> = () => {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn(false);
  const value = React.useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);

  return (
    <header className="border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <div className="ml-4 font-semibold p-2 hover:border hover:bg-black hover:bg-opacity-10 rounded-2xl">
          <Link to="/">
            <span className="font-bold text-lg">Skate</span>
            <span className="font-light text-lg">Spot</span>
          </Link>
        </div>
        {/* Search Form */}
        <SearchForm />
        {/* Nav Links*/}
        {isLoggedIn ? (
          <div className="mr-4">
            <nav>
              <ul className="flex items-center">
                <li className="mr-5">
                  <div className="font-semibold p-2 hover:border hover:bg-black hover:bg-opacity-10 rounded-2xl">
                    <span>
                      <Link to="/create-skate-spot">Create Skate Spot</Link>
                    </span>
                  </div>
                </li>
                <li>
                  <TokenContext.Provider value={value}>
                    <Account />
                  </TokenContext.Provider>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="block mr-4 mb-1">
            <nav>
              <ul className="flex items-center">
                <li className="">
                  <Link
                    to="/login"
                    className="cursor-pointer text-black block font-bold leading-tight pt-3 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-black"
                  >
                    Log In
                  </Link>
                </li>
                <li className="">
                  <Link
                    to="/register"
                    className="cursor-pointer align-middle text-center font-bold select-none text-sm rounded border-solid border-black border-2 pt-2 pb-2 px-7.5 whitespace-nowrap leading-tight transition duration-500 ease-in-out hover:bg-black hover:bg-opacity-10 hover:text-black text-black"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
