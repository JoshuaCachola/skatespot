import React from 'react';
import { Link } from 'react-router-dom';
// import { AccountDropDown } from './AccountDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {

}

export const Account: React.FC<Props> = () => {
  return(
    <div className='flex'>
      <div className='rounded-l-sm rounded-r-none border'>
        <div className='p-2 bg-white text-gray-300'>
          <Link to='/user-profile'>
            <FontAwesomeIcon icon={['fas', 'user']} />
          </Link>
        </div>
      </div>
      <div className='rounded-r-sm roudner-l-none border'>
        <div className='my-auto mx-0 h-full'>
          <div className='cursor-pointer p-2 text-white bg-black bg-opacity-25'>
            <FontAwesomeIcon icon={['fas', 'angle-down']} />
          </div>
        </div>
      </div>
    </div>
  );
}