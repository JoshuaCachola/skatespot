import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';
import { ImageModal } from 'src/utils/ImageModal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { SkateSpotReviews } from './SkateSpotReviews';
import { AverageReviewStars } from '../components/AverageReviewStars';
// import { useGetSkateSpotLazyQuery } from 'src/generated/graphql';

interface LocationProps {
  location: any;
}

export const SkateSpot: React.FC<LocationProps> = ({ location }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' });

  // const [skateSpot, { loading, error }] = useGetSkateSpotLazyQuery({
  //   onCompleted: ({ getSkateSpot }) => {
  //     console.log(getSkateSpot);
  //     setSpot(getSkateSpot);
  //   },
  // });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imagesIdx, setImagesIdx] = useState<number>(0);
  const spot = React.useMemo(() => location.state.skatespot, [location.state.skatespot]);
  // const [spot, setSpot] = useState<any>(location.state.skatespot);

  // React.useEffect(() => {
  //   if (!spot) {
  //     const pathname = location.pathname.split('/');
  //     const name = pathname[pathname.length - 1];
  //     skateSpot({ variables: { name } });
  //   } else {
  //     setSpot(location.state.skatespot);
  //   }
  // }, [location.pathname, location.state, skateSpot]);

  const handleImageClick = (e) => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    setImagesIdx(parseInt(e.target.id));
  };

  // if (loading) {
  //   return <h1>loading</h1>;
  // }

  // if (!spot || error) {
  //   return <NotFound />;
  // }

  return (
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className="relative">
        <div className={`relative z-40 bg-black ${isDesktopOrLaptop ? 'w-full' : 'w-full'}`}>
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
            interval={3000}
          >
            {spot.imageUrls &&
              JSON.parse(spot.imageUrls).map((img, idx) => {
                return (
                  <div
                    key={idx}
                    id={idx.toString()}
                    className="relative flex justify-center h-110 max-w-200 bg-black cursor-pointer z-50"
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
            isDesktopOrLaptop ? 'py-20 px-40' : 'px-40 py-50'
          }`}
        >
          <div className="relative z-50 min-w-full">
            <div className="flex justify-between items-center">
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
                  <AverageReviewStars
                    reviewsCount={spot.reviewsCount}
                    reviewsDistribution={JSON.parse(spot.reviewsDistribution)}
                  />
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
              <div className="flex-initial">
                <Link
                  to={{
                    pathname: `/photos/${spot.name}`,
                    state: { skateSpot: spot },
                  }}
                  className="font-bold text-white focus:outline-none border rounded border-white py-3 px-8 min-w-44"
                >
                  See {JSON.parse(spot.imageUrls).length} Photos
                </Link>
              </div>
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
                    <div className="mb-5">
                      <Link
                        to={{
                          pathname: `/write-review/${spot.name}`,
                          state: { skateSpot: { id: spot.id, name: spot.name } },
                        }}
                        className="text-black rounded border-red-600 border mb-6 mr-6 py-2 px-6 font-bold"
                      >
                        Write Review
                      </Link>
                      <Link to="/" className="text-black rounded border-red-600 border mb-6 mr-6 py-2 px-6 font-bold">
                        Add photo
                      </Link>
                    </div>
                  </div>
                  <div className="border-b border-black my-4">
                    {/* Header */}
                    <div className="text-black font-bold text-xl mb-4">
                      <span>Location</span>
                    </div>
                    <div className="flex">
                      <div className="mb-5">
                        {/* static map */}
                        <div>
                          <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=300x150&maptype=roadmap&markers=color:red%7C${
                              JSON.parse(spot.location).lat
                            },${JSON.parse(spot.location).lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                            alt="static-map"
                          />
                        </div>
                        <div className="mt-5">
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
      {isOpen && (
        <ImageModal idx={imagesIdx} setIdx={setImagesIdx} images={JSON.parse(spot.imageUrls)} setIsOpen={setIsOpen} />
      )}
      <Footer />
    </div>
  );
};
