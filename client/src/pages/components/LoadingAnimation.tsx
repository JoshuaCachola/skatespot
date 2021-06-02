import React from 'react';
import wave from '../../assets/wave.png';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="relative border-4 border-white w-auto h-full py-5 px-2 rounded-lg bg-red-500 z-0">
      <div className="relative z-50 text-center text-indigo-50">
        <span className="font-bold text-7xl">Skate</span>
        <span className="font-thin text-7xl">Spot</span>
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
      >
        {/* <img src={wave} className="animate-wave3 opacity-50" /> */}
      </div>
      <div
        className="absolute bottom-0 z-10 w-full left-0 h-full animate-wave4 opacity-25"
        style={{ backgroundImage: `url(${wave})` }}
      >
        {/* <img src={wave} className="animate-wave4 opacity-50" /> */}
      </div>
    </div>
  );
};
