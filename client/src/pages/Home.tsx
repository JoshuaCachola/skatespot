import React from 'react';
import { Header } from './Header';
import HomepageHero from '../assets/homepage-hero.jpg';

interface Props {

}

export const Home: React.FC<Props> = () => {
  return (
    <div>
      <div className='w-screen h-50'>
        <img src={HomepageHero} alt='homepage hero' className='w-screen max-h-full bg-contain object-cover'/>
      </div>
      <div>
        {/* <h1 className='text-blue-200'>Home</h1> */}
        <Header />
      </div>
    </div>
  );
};
