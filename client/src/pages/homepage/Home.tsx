import React, { useEffect, useRef, useState } from 'react';
import HeroInner from '../../assets/homepage-hero-alt.png';
import HeroOuter from '../../assets/HeroOuter.png';
import HomepageBody from '../../assets/HomepageBody.jpg';
import { Parallax } from 'react-parallax';
import { HomepageHeader } from './HomepageHeader';
import SearchForm from '../components/search/SearchForm';
import { useMediaQuery } from 'react-responsive';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useGetSkateSpotsQuery } from 'src/generated/graphql';
import { ReviewStar } from 'src/utils/ReviewStar';
import { Link } from 'react-router-dom';

interface Props {}

export const Home: React.FC<Props> = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1226px)' });
  const [headerHeight, setHeaderHeight] = useState<any>(0);
  const [scroll, setScroll] = useState<any>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [skateSpots, setSkateSpots] = useState<Array<any>>([]);

  const { data, loading } = useGetSkateSpotsQuery({
    fetchPolicy: 'network-only',
  });

  console.log(skateSpots);
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

  const handleRemoveSkateSpot = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    const newSkateSpots = skateSpots.filter((skateSpot) => skateSpot.id !== id);
    setSkateSpots(newSkateSpots);
  };

  return (
    <div ref={headerRef} className="relative z-10">
      {isTabletOrMobile ? (
        <>
          <Header />
        </>
      ) : (
        <>
          <Parallax bgImage={HeroOuter} strength={220} blur={{ min: -2, max: 4 }}>
            <div className="w-full">
              <img src={HeroInner} alt="hero-inner" />
            </div>
          </Parallax>
          <>
            <div className="absolute top-10 right-10 max-w-5xl my-0 mx-auto py-0 px-0.5">
              <HomepageHeader />
            </div>
            <div
              className={`absolute max-w-5xl mt-8 mx-auto z-20 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4 ${
                isTabletOrMobile ? 'pt-44' : 'pt-20'
              }`}
            >
              <div
                className="w-72 h-20 mt-0 mx-auto align-baseline text-white text-5xl"
                style={{ opacity: `${-scroll / (headerHeight / 5) + 1}` }}
              >
                <h1 className="text-center">
                  <span className="font-bold">Skate</span>
                  <span className="font-light">Spot</span>
                </h1>
              </div>
              {/* Search Form */}
              <SearchForm />
            </div>
          </>
        </>
      )}
      <section className="mt-10 mb-28 h-full bg-white relative z-10">
        <div className={`max-w-7xl my-10 mx-auto flex ${isTabletOrMobile ? 'justify-center' : 'justify-around'}`}>
          {/* Section Header */}
          <div className="relative">
            <div className="mx-auto my-0 font-bold text-xl border-b-2 pb-2 border-black">
              <h2 className="text-center">Review Skate Spots</h2>
            </div>
            {!loading &&
              skateSpots.length &&
              skateSpots.slice(0, 5).map((skateSpot, idx) => {
                return (
                  <Link
                    to={{
                      pathname: `/write-review/${skateSpot.name}`,
                      state: { skateSpot },
                    }}
                    key={skateSpot.id}
                  >
                    <div className="w-115 h-36 border border-gray-300 rounded my-5 flex overflow-hidden hover:bg-gray-50 cursor-pointer">
                      <div className="absolute right-2 rounded px-1 py-1">
                        <button
                          className="text-lg text-gray-400"
                          onClick={(event) => handleRemoveSkateSpot(event, skateSpot.id)}
                        >
                          x
                        </button>
                      </div>
                      <div className="flex justify-center align-middle overflow-hidden m-2">
                        <img src={JSON.parse(skateSpot.imageUrls)[0]} alt="" className="min-h-full w-44" />
                      </div>
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
            <div className="relative w-110 h-110 my-32">
              <img src={HomepageBody} alt="" className="rounded-3xl" />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
