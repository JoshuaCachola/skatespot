import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';
import { ImageModal } from 'src/utils/ImageModal';
// import SkateSpot1 from '../../assets/SkateSpot1.jpg';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SkateSpotReviews } from './SkateSpotReviews';

interface LocationProps {
  location: any;
}

export const SkateSpot: React.FC<RouteComponentProps> = ({ location }: LocationProps) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imagesIdx, setImagesIdx] = useState<number>(0);

  const spot = location.state.skateSpot;
  const handleImageClick = (e) => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    setImagesIdx(parseInt(e.target.id));
  };

  console.log();
  return (
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className={`z-50 bg-black mx-auto ${isDesktopOrLaptop ? 'w-full' : 'w-full'}`}>
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          showIndicators={false}
          centerSlidePercentage={50}
          stopOnHover={true}
          showStatus={false}
          centerMode={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {spot.imageUrls &&
            JSON.parse(spot.imageUrls).map((img, idx) => {
              return (
                <div
                  key={idx}
                  id={idx.toString()}
                  className="flex justify-center h-110 max-w-200 bg-black cursor-pointer"
                  onClick={(e) => handleImageClick(e)}
                >
                  <img src={img} alt={`img-${idx}`} className="object-cover align-middle" />
                </div>
              );
            })}
        </Carousel>
      </div>
      <div className="relative">
        <div
          className={`absolute m-auto flex content-end box-border flex-wrap top-0 bottom-0 left-0 right-0 ${
            isDesktopOrLaptop ? 'py-20 px-80' : 'px-20 py-10'
          }`}
        >
          <div className="border-separate table table-auto min-w-full">
            <div className="border-collapse box-border align-top table-cell">
              <div className={`mb-2 ${isTabletOrMobile && 'w-72'}`}>
                {/* name of skate spot */}
                <div>
                  <h1
                    className={`text-white font-extrabold inline leading-10 ${
                      isDesktopOrLaptop ? 'text-5xl' : 'text-4xl'
                    }`}
                  >
                    {spot.name}
                  </h1>
                </div>
                {/* reviews */}
                <div className="flex text-2xl text-white font-bold">
                  <div>
                    <span>
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </span>
                  </div>
                  <div>
                    <span>&nbsp;{spot.reviewsCount}</span>
                  </div>
                </div>
                <div className="text-white font-semibold">
                  <div>
                    <h4>
                      {spot.categoryName}&nbsp;•&nbsp;{spot.permanentlyClosed ? 'Closed' : 'Open'}
                    </h4>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="flex-initial">
              <button className="font-bold text-white focus:outline-none border rounded border-white py-3 px-8 w-44">
                See {JSON.parse(spot.imageUrls).length} Photos
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Container for skate spot information */}
      <div className="mt-6 mb-28">
        <div className="min-w-300">
          <div className="max-w-295 mx-auto my-0">
            <div className="leading-loose mx-auto my-0 w-2/3">
              <div className="flex w-full">
                {/* buttons for writing reviews, adding photos, follow skate spot */}
                <div className="w-2/3 max-w-295">
                  <div className="border-b border-black">
                    <Link
                      to={{
                        pathname: `/write-review/${spot.name}`,
                        state: { skateSpot: { id: spot.id, name: spot.name } },
                      }}
                      className="text-black rounded border-red-600 border mb-6 mr-6 py-2 px-6 font-bold"
                    >
                      Write Review
                    </Link>
                    <button className="text-black rounded border-red-600 border py-1 px-6 font-bold">Add photo</button>
                  </div>
                  <div className="border-b border-black my-4">
                    {/* Header */}
                    <div className="text-black font-bold text-xl mb-4">
                      <span>Location & Hours</span>
                    </div>
                    <div className="flex">
                      <div className="mb-5">
                        {/* static map */}
                        <div></div>
                        <div>
                          <p className="font-semibold text-base">
                            <span>{spot.street}</span>
                          </p>
                          <p className="font-normal text-base">
                            <span>
                              {spot.city},&nbsp;{spot.state}&nbsp;{spot.postalCode}
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* Popular times histogram */}
                      <div></div>
                    </div>
                  </div>
                  {/* Reviews */}
                  <SkateSpotReviews skateSpotId={spot.id} />
                </div>
                {/* fixed side panel for directions and photos */}
                {spot.website && (
                  <div className="w-1/3 max-h-48 sticky ml-12 border rounded border-gray-200 mb-4">
                    <div>
                      <span>{spot.website}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <ImageModal idx={imagesIdx} setIdx={setImagesIdx} images={spot.imgs} setIsOpen={setIsOpen} />}
      <Footer />
    </div>
  );
};
