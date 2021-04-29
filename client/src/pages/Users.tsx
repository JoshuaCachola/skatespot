import React, { useEffect, useRef, useState } from 'react';
import HeroInner from '../assets/homepage-hero-alt.png';
// import HeroInner from '../assets/HeroInner.png';
import HeroOuter from '../assets/HeroOuter.png';
// import SunsetBG from '../assets/SunsetBG.jpg';
// import HomepageHero from '../assets/homepage-hero.jpg';
import { Parallax } from 'react-parallax';
import { HomepageHeader } from './homepage/HomepageHeader';
import SearchForm from './components/search/SearchForm';

interface Props {}

// const image1 =
//   "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
// const image2 =
//   "https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg";

export const Users: React.FC<Props> = () => {
  const [headerHeight, setHeaderHeight] = useState<any>(0);
  const [scroll, setScroll] = useState<any>(0);
  const headerRef = useRef<null>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeaderHeight(document.getElementById('header')?.offsetHeight);
      setScroll(window.pageYOffset);
    });
  }, []);

  return (
    <div ref={headerRef} id="header">
      <Parallax bgImage={HeroOuter} strength={220} blur={{ min: -2, max: 4 }}>
        <div className="h-1/2 w-full bg-transparent">
          <div>
            <img src={HeroInner} alt="" />
          </div>
          <div className="absolute top-10 right-10 max-w-5xl my-0 mx-auto py-0 px-0.5">
            <HomepageHeader />
          </div>
          <div className="absolute pt-20 max-w-5xl my-0 mx-auto z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-center text-5xl text-white" style={{ opacity: `${-scroll / (headerHeight / 4) + 1}` }}>
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
      <section className="h-screen z-10">
        <div>
          <h1>hello</h1>
        </div>
      </section>
    </div>
  );
};
