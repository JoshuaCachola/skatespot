import React from 'react';
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
        <div className=''>
          <h1>Skate Spot</h1>
        </div>
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