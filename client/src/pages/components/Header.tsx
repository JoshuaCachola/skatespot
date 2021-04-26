import React from 'react';
import { Link } from 'react-router-dom';
import { Account } from '../homepage/Account';
import SearchForm from './search/SearchForm';

interface Props {

}

// todo
//  - align logo middle

export const Header: React.FC<Props> = () => {
  return(
    <header className='border-b-2 border-gray-100'>
      {/* Logo */}
      <div className='flex items-center justify-between'>
        <div>
          <Link to='/'>
            SkateSpot
          </Link>
        </div>
        {/* Search Form */}
        <div>
          <SearchForm />
        </div>
        {/* Nav Links*/}
        <div>
          <ul className='flex'>
            <li className='mr-5'>
              <Link to='/create-skate-spot'>
                Create Skate Spot
              </Link>
            </li>
            <li className='mr-5'>
              <Link to='/private'>
                Users
              </Link>
            </li>
            <li>
              <Account />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}