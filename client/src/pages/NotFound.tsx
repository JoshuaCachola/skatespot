import React from 'react';
import { Link } from 'react-router-dom';
import NotFound404 from '../assets/404-not-found.jpg';

interface Props {}

export const NotFound: React.FC<Props> = () => {
  return (
    <div>
      <header className="flex text-3xl justify-around border-b border-red-500 h-full bg-red-500 py-5 m-0 text-white">
        <Link to="/">
          <h1 className="m-0 p-0">
            <span className="font-bold">Skate</span>
            <span className="font-thin">Spot</span>
          </h1>
        </Link>
      </header>
      <div className="flex flex-col w-210 mx-auto my-10 items-center h-screen">
        <div className="w-1/2 border-t border-l border-r-4 border-b-4 px-5 py-5 border-black my-10">
          <p className="font-semibold text-7xl">404:</p>
          <p className="font-light text-6xl">Page not found...</p>
        </div>
        <div className="w-1/2 h-1/2">
          <img src={NotFound404} alt="not-found" className="rounded" />
        </div>
      </div>
    </div>
  );
};
