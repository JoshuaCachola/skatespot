import React from 'react';
import { Link } from 'react-router-dom';
import { AccountDropDown } from './AccountDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {

}

export const Account: React.FC<Props> = () => {
  return(
    <div className='flex'>
      <div className='rounded-l-sm rounded-r-none border'>
        <Link to='/user-profile'>
          <FontAwesomeIcon icon={['fas', 'user']} />
        </Link>
      </div>
      <div className='rounded-r-sm roudner-l-none border'>
        <div>
          <FontAwesomeIcon icon={['fas', 'angle-down']} />
          <AccountDropDown />
        </div>
      </div>
    </div>
  );
}