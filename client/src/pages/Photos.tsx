import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { AverageReviewStars } from './components/AverageReviewStars';
import { ImageModal } from 'src/utils/ImageModal';
import { useMediaQuery } from 'react-responsive';

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
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sliceRange, setSliceRange] = useState<Array<number>>([0, 25]);

  const skateSpot = location.state.skateSpot;

  useEffect(() => {
    setMaxPages(Math.ceil(photos.length / 25));
  }, []);

  const handleNextPage = () => {
    if (currentPage === maxPages) {
      return;
    }

    setSliceRange([sliceRange[1], sliceRange[1] + 25]);

    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }

    setSliceRange([sliceRange[0] - 25, sliceRange[1] - 25]);
    setCurrentPage(currentPage - 1);
  };

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
      <div className={`my-4 mx-auto h-full ${isDesktopOrLaptop ? 'w-210' : 'w-72'}`}>
        <div className="border-b border-gray-400 mb-5">
          <div className="font-bold text-3xl mb-4">
            <h1>{skateSpot.name}</h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex my-2 items-center">
              <div className={`max-h-20 flex justify-center ${isDesktopOrLaptop ? 'w-20' : 'w-12 h-12'}`}>
                <img src={JSON.parse(skateSpot.imageUrls)[0]} alt="" className="rounded object-cover align-middle" />
              </div>
              <div className="ml-2 text-sm mt-1">
                <Link to="/" className="text-blue-600 font-bold">
                  {skateSpot.name}
                </Link>
                {isDesktopOrLaptop && (
                  <div className="text-xs flex">
                    <AverageReviewStars
                      reviewsCount={skateSpot.reviewsCount}
                      reviewsDistribution={JSON.parse(skateSpot.reviewsDistribution)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className={`border-blue-400 rounded p-2 bg-blue-400 text-white font-bold border-l border-t border-r-4 border-b-4 hover:bg-blue-200 ${
                !isDesktopOrLaptop && 'w-24 text-xs text-center'
              }`}
            >
              <Link to={{ pathname: '/skatespot-photos/add', state: { name: skateSpot.name, id: skateSpot.id } }}>
                Add Photos
              </Link>
            </div>
          </div>
        </div>
        {/* Photos grid */}
        <div className="flex">
          <ul className="grid grid-flow-row grid-cols-5 grid-rows-5 gap-4">
            {/* {JSON.parse(skateSpot.imageUrls).map((photo, idx) => {
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
            })} */}
            {photos.slice(sliceRange[0], sliceRange[1]).map((photo, idx) => {
              return (
                <li
                  className={`max-h-40 cursor-pointer flex justify-center bg-black rounded ${
                    isDesktopOrLaptop ? 'w-40' : 'w-12'
                  }`}
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
        <div className="border-t border-b border-gray-400 flex justify-between mt-10 mb-20">
          <div className="ml-2">
            Page {currentPage} of {maxPages}
          </div>
          <div>
            <button
              className={`mr-2 ${currentPage === 1 ? 'text-gray-400' : 'text-black'}`}
              onClick={() => handlePrevPage()}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className={`mr-2 ${currentPage === maxPages ? 'text-gray-400' : 'text-black'}`}
              onClick={() => handleNextPage()}
              disabled={currentPage === maxPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isOpen && <ImageModal images={photos} idx={idx} setIdx={setIdx} setIsOpen={setIsOpen} />}
      <Footer />
    </div>
  );
};
