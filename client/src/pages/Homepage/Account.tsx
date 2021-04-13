import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../UserProfile';
import { AccountDropDown } from './AccountDropDown';

interface Props {

}

export const Account: React.FC<Props> = () => {
  // const [logout, {client}] = useLogoutUserMutation();
  return(
    <div className='flex'>
      <div className='rounded-l-sm rounded-r-none border'>
        <Link to='/user-profile' component={UserProfile}>
          User Profile
        </Link>
      </div>
      <div className='rounded-r-sm roudner-l-none border'>
        <div>
          <AccountDropDown />
        </div>
      </div>
    </div>
  );
}