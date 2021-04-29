import React from 'react';
import { Link } from 'react-router-dom';
import { Account } from '../homepage/Account';
import SearchForm from './search/SearchForm';

interface Props {}

// todo
//  - align logo middle

export const Header: React.FC<Props> = () => {
  return (
    <header className="border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <div className='ml-4 font-semibold p-2 hover:border hover:bg-red-500'>
          <Link to="/"><span>SkateSpot</span></Link>
        </div>
        {/* Search Form */}
        <div>
          <SearchForm />
        </div>
        {/* Nav Links*/}
        <div className='mr-4'>
          <ul className="flex items-center">
            <li className="mr-5">
              <div className='font-semibold p-2 hover:border hover:bg-red-500'>
                <span>
                  <Link to="/create-skate-spot">Create Skate Spot</Link>
                </span>
              </div>
            </li>
            <li>
              <Account />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
