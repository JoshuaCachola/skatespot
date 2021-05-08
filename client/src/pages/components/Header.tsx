import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';
import { TokenContext } from 'src/utils/TokenContext';
import { Account } from './Account';
import SearchForm from './search/SearchForm';

interface Props {}

// todo
//  - align logo middle

export const Header: React.FC<Props> = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const value = React.useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(!!accessToken());
  }, []);

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
        <div>
          <SearchForm />
        </div>
        {/* Nav Links*/}
        <div className="mr-4">
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
        </div>
      </div>
    </header>
  );
};
