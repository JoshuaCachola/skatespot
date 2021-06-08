import React, { useEffect, useRef, useState } from 'react';
import HeroInner from '../../assets/homepage-hero-alt.png';
import HeroOuter from '../../assets/HeroOuter.png';
import HomepageBody from '../../assets/HomepageBody.jpg';
import { Parallax } from 'react-parallax';
import { HomepageHeader } from './HomepageHeader';
import SearchForm from '../components/SearchForm';
import { useMediaQuery } from 'react-responsive';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useGetSkateSpotsQuery } from 'src/generated/graphql';
import { ReviewStar } from 'src/utils/ReviewStar';
import { Link } from 'react-router-dom';
import { ErrorBanner } from '../components/ErrorBanner';
import { Logo } from '../components/Logo';
import { HOME } from '../../utils/constants';

interface Props {}

export const Home: React.FC<Props> = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1429px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });

  const [headerHeight, setHeaderHeight] = useState<any>(0);
  const [scroll, setScroll] = useState<any>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [skateSpots, setSkateSpots] = useState<Array<any>>([]);

  const { data, loading, error } = useGetSkateSpotsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (data) {
      setSkateSpots(data.getSkateSpots);
    }
  }, [data]);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setHeaderHeight(headerRef.current?.offsetHeight);
      setScroll(window.pageYOffset);
    });

    return () => {
      setHeaderHeight(0);
      setScroll(0);
    };
  }, []);

  useEffect(() => {
    setHeaderHeight(0);
    setSkateSpots([]);
    setScroll(0);
  }, []);

  const handleRemoveSkateSpot = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    const newSkateSpots = skateSpots.filter((skateSpot) => skateSpot.id !== id);
    setSkateSpots(newSkateSpots);
  };

  return (
    <div ref={headerRef} className="relative bg-gray-50">
      {isTabletOrMobile ? (
        <>
          <Header />
        </>
      ) : (
        <>
          <div className={`absolute left-1/2 transform -translate-x-1/2 z-50`} style={{ top: '340px' }}>
            <div
              className="w-72 h-20 mt-0 mx-auto align-baseline text-white text-5xl flex items-center"
              style={{ opacity: `${-scroll / (headerHeight / 5) + 1}` }}
            >
              <Logo type={HOME} />
              <h1 className="text-center font-primary">
                &nbsp;<span className="font-bold">Skate</span>
                <span className="font-light">Spot</span>
              </h1>
            </div>
            {/* Search Form */}
            <div className="overflow-visible">
              <SearchForm />
            </div>
          </div>
          <Parallax
            bgImage={HeroOuter}
            strength={220}
            blur={{ min: -2, max: 4 }}
            className="w-screen max-w-max h-auto relative"
          >
            <div className="w-screen max-w-max">
              <img src={HeroInner} alt="hero-inner" />
            </div>
          </Parallax>

          <>
            <div className="absolute top-10 right-10 max-w-5xl my-0 mx-auto py-0 px-0.5 z-0">
              <HomepageHeader />
            </div>
            {/* <div className="relative"> */}

            {/* </div> */}
          </>
        </>
      )}
      {error && <ErrorBanner message="Error loading skatespots..." />}
      <section className={`mt-10 ${isMobile ? 'h-full' : 'h-screen'}`}>
        <div
          className={`max-w-7xl my-10 mx-auto flex ${isTabletOrMobile ? 'justify-center' : 'w-full justify-around'}`}
        >
          {/* Section Header */}
          <div className="relative">
            <div className="mx-auto my-0 font-bold text-xl border-b-2 pb-2 border-black">
              <h2 className="text-center">Review Skate Spots</h2>
            </div>
            {loading &&
              Array(5)
                .fill(0)
                .map((_, idx) => {
                  return (
                    <div
                      className={`border border-gray-100 shadow rounded p-4 w-115 h-36 mx-auto my-2 bg-white ${
                        isMobile && 'w-80'
                      }`}
                      key={idx}
                    >
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-light-gray-100 h-12 w-12"></div>
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-light-gray-100 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-light-gray-100 rounded"></div>
                            <div className="h-4 bg-light-gray-100 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            {!loading &&
              skateSpots &&
              skateSpots.slice(0, 5).map((skateSpot) => {
                return (
                  <Link
                    to={{
                      pathname: `/write-review/${skateSpot.name}`,
                      state: { skateSpot },
                    }}
                    key={skateSpot.id}
                  >
                    <div
                      className={`h-36 border border-gray-300 rounded my-5 flex overflow-hidden hover:shadow-xl hover:bg-gray-100 cursor-pointer ${
                        isMobile ? 'w-72' : 'w-115'
                      }`}
                    >
                      <div className="absolute right-2 rounded px-1 py-1">
                        <button
                          className="text-lg text-gray-700"
                          onClick={(event) => handleRemoveSkateSpot(event, skateSpot.id)}
                        >
                          x
                        </button>
                      </div>
                      {!isMobile && (
                        <div className="flex justify-center align-middle overflow-hidden m-2">
                          <img src={JSON.parse(skateSpot.imageUrls)[0]} alt="skate-spot" className="min-h-full w-44" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-base my-2 ml-5 text-red-600 overflow-clip">
                          <h3>{skateSpot.name.slice(0, 25)}</h3>
                        </div>

                        <div className="ml-5">
                          <p>Review this skate spot</p>
                        </div>
                        <div className="flex text-sm text-gray-500 font-bold m-4">
                          <ReviewStar />
                          <ReviewStar />
                          <ReviewStar />
                          <ReviewStar />
                          <ReviewStar />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
          {!isTabletOrMobile && (
            <div className="w-110 h-110 my-32">
              <img src={HomepageBody} alt="" className=" border border-black rounded" />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
