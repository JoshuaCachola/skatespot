import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';
import { ImageModal } from 'src/utils/ImageModal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { AverageReviewStars } from '../components/AverageReviewStars';
import { useGetSkateSpotQuery } from 'src/generated/graphql';
import { NotFound } from '../NotFound';
import { SkateSpotBottom } from './SkateSpotBottom';

interface LocationProps {
  location: any;
}

export const SkateSpot: React.FC<LocationProps> = ({ location }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imagesIdx, setImagesIdx] = useState<number>(0);
  const { data, loading, error } = useGetSkateSpotQuery({
    variables: { name: location.pathname.split('/')[2] },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  React.useEffect(() => {
    return () => {
      setIsOpen(false);
      setImagesIdx(0);
    };
  }, []);

  const handleImageClick = (e) => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    setImagesIdx(parseInt(e.target.id));
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-lg font-semibold text-center my-10">
          <span>Searching for skate spot...</span>
        </div>
      </>
    );
  }
  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className="relative">
        <div className="relative z-40 bg-black">
          <Carousel
            showThumbs={false}
            emulateTouch={true}
            showIndicators={false}
            centerSlidePercentage={50}
            stopOnHover={true}
            showStatus={false}
            centerMode={isDesktopOrLaptop ? true : false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
          >
            {data?.getSkateSpot.imageUrls &&
              JSON.parse(data?.getSkateSpot.imageUrls).map((img, idx) => {
                return (
                  <div
                    key={idx}
                    id={idx.toString()}
                    className={`relative flex justify-center max-w-200 bg-black cursor-pointer z-50 ${
                      isTabletOrMobile ? 'h-80' : 'h-110'
                    }`}
                    onClick={(e) => handleImageClick(e)}
                  >
                    <img src={img} alt={`img-${idx}`} className="object-cover align-middle" />
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div
          className={`absolute flex content-end flex-wrap top-0 bottom-0 left-0 right-0 ${
            isDesktopOrLaptop ? 'py-50 px-20' : 'px-2 py-50'
          }`}
        >
          <div className="relative z-40 min-w-full">
            <div className="flex justify-between items-center">
              <div className={`mb-2 ${isTabletOrMobile && 'w-44'}`}>
                {/* name of skate spot */}
                <div>
                  <h1
                    className={`text-white font-extrabold inline leading-10 ${
                      isDesktopOrLaptop ? 'text-5xl' : 'text-xl'
                    }`}
                  >
                    {data?.getSkateSpot.name}
                  </h1>
                </div>
                {/* reviews */}
                <div className={`flex text-white font-bold ${isDesktopOrLaptop ? 'text-2xl' : 'text-xs'}`}>
                  <AverageReviewStars
                    reviewsCount={data?.getSkateSpot.reviewsCount}
                    reviewsDistribution={JSON.parse(data!.getSkateSpot.reviewsDistribution)}
                  />
                  <div>
                    <span className="text-lg">&nbsp;{data?.getSkateSpot.reviewsCount}</span>
                  </div>
                </div>
                <div className={`text-white font-semibold ${isDesktopOrLaptop ? 'text-base' : 'text-xs'}`}>
                  <div>
                    <h4>
                      {data?.getSkateSpot.categoryName}&nbsp;•&nbsp;
                      {data?.getSkateSpot.permanentlyClosed ? 'Closed' : 'Open'}
                    </h4>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="flex-initial">
                <Link
                  to={{
                    pathname: `/photos/${data?.getSkateSpot.name}`,
                    state: { skateSpot: data?.getSkateSpot },
                  }}
                  className={`font-bold text-white focus:outline-none border-t border-l border-r-4 border-b-4 rounded border-white min-w-44 hover:bg-black hover:bg-opacity-40 ${
                    isDesktopOrLaptop ? 'text-base min-w-44 py-3 px-8' : 'text-sm py-1 px-1'
                  }`}
                >
                  See {JSON.parse(data!.getSkateSpot.imageUrls).length} Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Container for skate spot information */}
      <div className="mt-6 mb-28">
        <SkateSpotBottom skatespot={data?.getSkateSpot} />
      </div>
      {isOpen && (
        <ImageModal
          idx={imagesIdx}
          setIdx={setImagesIdx}
          images={JSON.parse(data!.getSkateSpot.imageUrls)}
          setIsOpen={setIsOpen}
        />
      )}
      <Footer />
    </div>
  );
};
