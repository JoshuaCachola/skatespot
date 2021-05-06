import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { AverageReviewStars } from './components/AverageReviewStars';
import { ImageModal } from 'src/utils/ImageModal';

interface Props {}

const photos = [
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
  SkateSpot1,
];

export const Photos: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);

  const handleImageClick = (e) => {
    if (isOpen) {
      return;
    }

    setIdx(parseInt(e.currentTarget.id));
    setIsOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="my-4 max-w-300 w-295 mx-24">
        <div className="border-b border-gray-400 mb-5">
          <div className="font-bold text-3xl mb-4">
            <h1>Photos for Milpitas Skate Park</h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="h-24 w-24">
                <img src={SkateSpot1} alt="" />
              </div>
              <div className="ml-2 text-sm mt-1">
                <Link to="/" className="text-blue-600 font-bold">
                  Milpitas Skate Park
                </Link>
                <div className="text-xs flex">
                  <AverageReviewStars rating={3} />
                </div>
              </div>
            </div>
            <div className="border-red-500 rounded p-2 bg-red-500 text-white font-bold">
              <Link to="/">Add Photos</Link>
            </div>
          </div>
        </div>
        {/* Photos grid */}
        <div className="flex justify-center">
          <ul className="grid grid-flow-row grid-cols-5 grid-rows-5 gap-4">
            {photos.map((photo, idx) => {
              return (
                <li
                  className="w-40 h-auto cursor-pointer flex justify-center"
                  id={idx.toString()}
                  key={idx}
                  onClick={(e) => handleImageClick(e)}
                >
                  <img src={photo} alt="" className="rounded object-cover align-middle" />
                </li>
              );
            })}
          </ul>
        </div>
        {/* Pagination */}
        <div className="border-t border-b border-gray-400 flex justify-between">
          <div className="ml-2">Page 1 of 1</div>
          <div className="mr-2">Next</div>
        </div>
      </div>
      {isOpen && <ImageModal images={photos} idx={idx} setIdx={setIdx} setIsOpen={setIsOpen} />}
      <Footer />
    </div>
  );
};
