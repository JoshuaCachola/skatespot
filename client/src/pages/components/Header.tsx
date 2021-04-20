import React from 'react';
import { Link } from 'react-router-dom';
import { Account } from '../homepage/Account';
import { SearchForm } from './SearchForm';

interface Props {

}

// todo
//  - align logo middle

export const Header: React.FC<Props> = () => {
  return(
    <header>
      {/* Logo */}
      <div className='flex items-center justify-around'>
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