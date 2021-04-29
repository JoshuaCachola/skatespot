import React from 'react';
import SearchResultsFull1 from '../assets/SearchResultsFull1.jpg';
import { Header } from './components/Header';

interface Props {}

const user = {
  username: 'crookiemonster',
  firstName: 'Joshua',
  lastName: 'Cachola',
  stance: 'regular',
};

export const UserProfile: React.FC<Props> = () => {
  return (
    <div>
      <Header />
      {/* User information and photo */}
      <div className="flex max-w-4xl my-5 mx-auto">
        {/* Account profile picture */}
        <div className="rounded mt-5 mb-8 ml-20">
          <img alt="profile" src={SearchResultsFull1} width={200} height={200} className="rounded" />
        </div>
        {/* Account information */}
        <div className="my-4 ml-28 leading-normal">
          <h1 className="font-light text-3xl mb-4">{user.username}</h1>
          <p className="mb-4">
            <span className="font-semibold">stance</span> <span className="uppercase">{user.stance}</span>
          </p>
          <h2 className="font-semibold">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>
      {/* User photos/videos */}
      <div className="max-w-4xl border-t-2 border-grey-200 my-0 mx-auto">
        <h1>photos</h1>
      </div>
    </div>
  );
};
