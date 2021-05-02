import React, { useEffect, useRef, useState } from 'react';
import HeroInner from '../assets/homepage-hero-alt.png';
import HeroOuter from '../assets/HeroOuter.png';
import LoginHero from '../assets/LoginHero.png';
import SkateSpot from '../assets/SkateSpot1.jpg';
import { Parallax } from 'react-parallax';
import { HomepageHeader } from './homepage/HomepageHeader';
import SearchForm from './components/search/SearchForm';
import { useMediaQuery } from 'react-responsive';
import { Footer } from './components/Footer';
// import { ReviewStars } from 'src/utils/ReviewStars';

interface Props {}

export const Users: React.FC<Props> = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1226px)' });
  const [headerHeight, setHeaderHeight] = useState<any>(0);
  const [scroll, setScroll] = useState<any>(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setHeaderHeight(headerRef.current?.offsetHeight);
      setScroll(window.pageYOffset);
    });
  }, []);

  return (
    <div ref={headerRef} className="relative">
      <Parallax bgImage={HeroOuter} strength={220} blur={{ min: -2, max: 4 }}>
        <div className="w-full">
          <div>
            <img src={HeroInner} alt="hero-inner" />
          </div>
          <div className="absolute top-10 right-10 max-w-5xl my-0 mx-auto py-0 px-0.5">
            <HomepageHeader />
          </div>
          <div
            className={`absolute max-w-5xl my-0 mx-auto z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isTabletOrMobile ? 'pt-44' : 'pt-20'
            }`}
          >
            <div className="text-center text-white text-5xl" style={{ opacity: `${-scroll / (headerHeight / 5) + 1}` }}>
              <h1 className="text-center w-72 h-20 mt-0 mx-auto mb-12 align-baseline">
                <span className="font-bold">Skate</span>
                <span className="font-light">Spot</span>
              </h1>
            </div>
            {/* Search Form */}
            <SearchForm />
          </div>
        </div>
      </Parallax>
      <section className="my-10 h-full z-10 bg-white">
        <div className={`max-w-5xl my-10 mx-auto flex ${isTabletOrMobile ? 'justify-center' : 'justify-around'}`}>
          {/* Section Header */}
          <div className="relative">
            <div className="mx-auto my-0 font-bold text-xl border-b border-dashed pb-2 border-gray-400">
              <h2 className="text-center">Find New Skate Spots</h2>
            </div>
            <div className="w-115 h-36 border-t border-b border-gray-300 rounded my-5 flex overflow-hidden">
              <div className="w-48 m-2">
                <img src={SkateSpot} alt="" className="" />
              </div>
              <div>
                <div className="font-bold text-lg my-2 ml-5 text-red-600">
                  <h3>
                    <span>Milpitas Skate Park</span>
                  </h3>
                </div>
                <div className="ml-5">
                  <p>Review this skate spot</p>
                </div>
                <div>{/* <ReviewStars /> */}</div>
              </div>
            </div>
          </div>
          {!isTabletOrMobile && (
            <div className="relative w-80 h-80 my-auto">
              <img src={LoginHero} alt="" />
            </div>
          )}
        </div>
        {/* Find new skaters */}
        <div className="py-4">
          <div className={`max-w-5xl my-10 mx-auto flex  ${isTabletOrMobile ? 'justify-center' : 'justify-around'}`}>
            {/* Section Header */}
            {!isTabletOrMobile && (
              <div className="relative w-80 h-80 my-auto">
                <img src={LoginHero} alt="" />
              </div>
            )}
            <div className="relative">
              <div className="mx-auto my-0 font-bold text-xl border-b border-dashed pb-2 border-gray-400">
                <h2 className="text-center">Find New Skaters</h2>
              </div>
              <div className="w-110 h-36 border-t border-b border-gray-300 rounded my-5 flex overflow-hidden bg-white">
                <div className="w-28 m-4">
                  <img src={LoginHero} alt="" className="" />
                </div>
                <div className="ml-5 my-auto">
                  <div className="font-semibold text-lg">
                    <h3>
                      <span>crookiemonster</span>
                    </h3>
                  </div>
                  <div className="font-light text-base">
                    <h3>
                      <span>Demo User</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
