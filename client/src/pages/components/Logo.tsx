import React from 'react';
import wave from '../../assets/wave.png';
import { HEADER } from '../../utils/constants';

interface Props {
  type: string;
}

export const Logo: React.FC<Props> = ({ type }) => {
  return (
    <div
      className={`relative border-r-4 border-b-4 border-t border-l bg-blue-400 border-black rounded ${
        type === HEADER ? 'w-16 py-2' : 'w-24 p-2'
      }`}
    >
      <div
        className={`relative z-50 text-center text-indigo-50 font-extrabold flex items-baseline justify-center ${
          type === HEADER ? 'text-2xl' : 'text-5xl'
        }`}
      >
        <span>S</span>
        <span className="font-thin">S</span>
        <div className="flex rounded-full w-3 h-3 bg-white" />
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
  );
};
