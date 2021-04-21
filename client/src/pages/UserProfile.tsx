import React from 'react';
import SearchResultsFull1 from '../assets/SearchResultsFull1.jpg';
import { Header } from './components/Header';

interface Props {

}

const user = {
  username: 'crookiemonster',
  firstName: 'Joshua',
  lastName: 'Cachola',
  stance: 'regular'
};

export const UserProfile: React.FC<Props> = () => {
  return(
    <div className='max-w-5xl my-0 mx-auto'>
      <Header />
      {/* User information and photo */}
      <div className='flex mt-4 border-t-2 border-grey-100'>
        {/* Account profile picture */}
        <div className='rounded m-5'>
          <img
            alt='profile'
            src={SearchResultsFull1}
            width={200}
            height={200}
            className='rounded'
          />
        </div>
        {/* Account information */}
        <div className='my-5'>
          <h1>{user.username}</h1>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.stance}</p>
        </div>
      </div>
      {/* User photos/videos */}
      <div className='border-t-2 border-grey-200'>
        <h1>photos</h1>
      </div>
    </div>
  );
};