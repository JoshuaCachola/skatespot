import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { AverageReviewStars } from './components/AverageReviewStars';
import { ImageModal } from 'src/utils/ImageModal';

interface Props {
  location: any;
}

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

export const Photos: React.FC<Props> = ({ location }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const skateSpot = location.state.skateSpot;
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
            <h1>{skateSpot.name}</h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex my-2">
              <div className="max-h-20 w-20 flex justify-center">
                <img src={JSON.parse(skateSpot.imageUrls)[0]} alt="" className="rounded object-cover align-middle" />
              </div>
              <div className="ml-2 text-sm mt-1">
                <Link to="/" className="text-blue-600 font-bold">
                  {skateSpot.name}
                </Link>
                <div className="text-xs flex">
                  <AverageReviewStars
                    reviewsCount={skateSpot.reviewsCount}
                    reviewsDistribution={JSON.parse(skateSpot.reviewsDistribution)}
                  />
                </div>
              </div>
            </div>
            <div className="border-red-500 rounded p-2 bg-red-500 text-white font-bold">
              <Link to={{ pathname: '/skatespot-photos/add', state: { name: skateSpot.name, id: skateSpot.id } }}>
                Add Photos
              </Link>
            </div>
          </div>
        </div>
        {/* Photos grid */}
        <div className="flex">
          <ul className="grid grid-flow-row grid-cols-5 grid-rows-5 gap-4">
            {JSON.parse(skateSpot.imageUrls).map((photo, idx) => {
              return (
                <li
                  className="w-40 max-h-40 cursor-pointer flex justify-center bg-black rounded"
                  id={idx.toString()}
                  key={idx}
                  onClick={(e) => handleImageClick(e)}
                >
                  <img src={photo} alt="" className="object-cover align-middle rounded" />
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
