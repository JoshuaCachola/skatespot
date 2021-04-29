import React from 'react';
import { HomepageHeader } from './HomepageHeader';
import HomepageHero from '../../assets/homepage-hero.jpg';
import SearchForm from '../components/search/SearchForm';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <div>
      {/* Add credit for the image */}
      <div
        className="w-screen h-50 bg-cover pt-7.5 bg-center h-hero bp-50"
        style={{ backgroundImage: `url(${HomepageHero})` }}
      >
        {/* header */}
        <div className="max-w-5xl my-0 mx-auto py-0 px-0.5">
          <HomepageHeader />
        </div>
        {/* inner hero homepage */}
        <div className="pt-20 max-w-5xl my-0 mx-auto">
          <div className="text-center font-bold text-4xl text-white">
            <h1 className="text-center w-72 h-20 mt-0 mx-auto mb-12 align-baseline">
              <span>Skate Spot</span>
            </h1>
          </div>
          {/* Search Form */}
          <SearchForm />
        </div>
      </div>
      {/* Newly added skatespots */}
      <div>
        <h2>New Skate Spots</h2>
      </div>
      {/* Newly added skaters*/}
      <div>
        <h2>New Skaters</h2>
      </div>
    </div>
  );
};
