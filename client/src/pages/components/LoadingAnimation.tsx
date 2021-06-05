import React from 'react';
import { useMediaQuery } from 'react-responsive';
import wave from '../../assets/wave.png';

export const LoadingAnimation: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' });

  return (
    <div className="w-1/2 mx-auto">
      <div className="border-r-8 border-t border-l border-b-8 border-black h-full py-5 px-2 rounded-lg bg-blue-400 z-0 relative">
        <div className="relative z-50 text-center text-indigo-50">
          <span className={`font-bold ${isTabletOrMobile ? 'text-4xl' : 'text-7xl'}`}>Skate</span>
          <span className={`font-thin ${isTabletOrMobile ? 'text-4xl' : 'text-7xl'}`}>Spot</span>
        </div>
        <div
          className="absolute bottom-0 z-40 w-full left-0 h-full animate-wave1 opacity-10"
          style={{ backgroundImage: `url(${wave})` }}
        />
        <div
          className="absolute bottom-0 z-30 w-full left-0 h-full animate-wave2 opacity-10"
          style={{ backgroundImage: `url(${wave})` }}
        />
        <div
          className="absolute bottom-0 z-20 w-full left-0 h-full animate-wave3 opacity-25"
          style={{ backgroundImage: `url(${wave})` }}
        ></div>
        <div
          className="absolute bottom-0 z-10 w-full left-0 h-full animate-wave4 opacity-25"
          style={{ backgroundImage: `url(${wave})` }}
        ></div>
      </div>
      {/* <h2 className="text-3xl flex justify-center mt-1 text-white">Loading...</h2> */}
      <div className="animate-pulse flex my-2 justify-center">
        <div className="h-5 w-5 rounded-full bg-white mx-1 border-r-4 border-b-4 border-l border-t border-black" />
        <div className="h-5 w-5 rounded-full bg-white mx-1 border-r-4 border-b-4 border-l border-t border-black" />
        <div className="h-5 w-5 rounded-full bg-white mx-1 border-r-4 border-b-4 border-l border-t border-black" />
        <div className="h-5 w-5 rounded-full bg-white mx-1 border-r-4 border-b-4 border-l border-t border-black" />
      </div>
    </div>
  );
};
