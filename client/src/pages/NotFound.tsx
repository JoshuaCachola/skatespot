import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import NotFound404 from '../assets/404-not-found.jpg';
import { Footer } from './components/Footer';

interface Props {}

export const NotFound: React.FC<Props> = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className="w-full">
      <header className="flex text-3xl justify-around border-b border-r-4 border-black h-full bg-blue-400 py-5 m-0 w-full text-white">
        <Link to="/">
          <h1 className="m-0 p-0">
            <span className="font-bold">Skate</span>
            <span className="font-thin">Spot</span>
          </h1>
        </Link>
      </header>
      <div className={`flex flex-col mx-auto my-10 items-center h-full ${isDesktopOrLaptop ? 'w-210' : 'w-full'}`}>
        <div className="w-1/2 border-t border-l border-r-4 border-b-4 px-5 py-5 border-black my-10">
          <p className={`font-semibold ${isDesktopOrLaptop ? 'text-7xl' : 'text-3xl'}`}>404:</p>
          <p className={`font-light ${isDesktopOrLaptop ? 'text-6xl' : 'text-2xl'}`}>Page not found...</p>
        </div>
        <div className="w-1/2 h-1/2">
          <img src={NotFound404} alt="not-found" className="rounded" />
        </div>
      </div>
      <div className={`${isDesktopOrLaptop ? 'absolute bottom-0' : ''}`}>
        <Footer />
      </div>
    </div>
  );
};
