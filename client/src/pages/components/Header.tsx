import React from 'react';
import { Link } from 'react-router-dom';
import { SearchForm } from './SearchForm';

interface Props {

}

// todo
//  - align logo middle

export const Header: React.FC<Props> = () => {
  return(
    <header>
      {/* Logo */}
      <div className='flex'>
        <Link to='/'>
          <h1>Skate Spot</h1>
        </Link>
        {/* Search Form */}
        <div>
          <SearchForm />
        </div>
        {/* Nav Links*/}
        <div>
          <ul>
            
          </ul>
        </div>
      </div>
    </header>
  );
}