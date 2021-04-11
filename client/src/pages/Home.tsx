import React from 'react';
import { Header } from './Header';
import HomepageHero from '../assets/homepage-hero.jpg';

interface Props {

}

export const Home: React.FC<Props> = () => {
  return (
    <>
    <div className='w-screen h-50 bg-cover pt-7.5 bg-center h-hero bp-50' style={{ backgroundImage: `url(${HomepageHero})` }}>
      {/* <img src={HomepageHero} alt='homepage hero' className='w-full max-w-none h-2/4 max-h-96 bg-cover object-cover'/> */}
      <div className='max-w-5xl my-0 mx-auto py-0 px-0.5'>
        <Header />
      </div>
      <div className='pt-20'> { /* inner hero homepage */ }
        <div className='text-center'>
          <h1 className='text-center w-40 h-20 mt-0 mx-auto mb-12 align-baseline'>Skate Spot</h1>
        </div>
        {/* Search Form */}
      </div>
    </div>
    </>
  );
};
