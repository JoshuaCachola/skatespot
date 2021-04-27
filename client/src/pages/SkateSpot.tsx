import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import SkateSpot2 from '../assets/SkateSpot2.jpg';
import { Header } from './components/Header';

interface Props {

}

const spot = {
  name: 'Milpitas Skate Park',
  imgs: [SkateSpot1, SkateSpot2]
};

export const SkateSpot: React.FC<Props> = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)'});
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)'});
  const [isFocusImage, setIsFocusImage] = useState<boolean>(false);
  return(
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className={`z-50 bg-black mx-auto ${isDesktopOrLaptop ? 'w-300' : 'w-full'}`}>
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
          {spot.imgs && spot.imgs.map((img, idx) => {
            return (
              <div key={idx} className='flex justify-center h-110 max-w-200 bg-black'>
                <img
                  src={img}
                  alt={`img-${idx}`}
                  className='object-cover align-middle'
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className='relative'>
        <div className={`absolute m-auto flex content-end box-border flex-wrap top-0 bottom-0 left-0 right-0 ${isDesktopOrLaptop ? 'py-20 px-80' : 'px-20 py-10'}`}>
          <div className='border-separate table table-auto min-w-full'>
            <div className='border-collapse box-border align-top table-cell'>
              <div className={`mb-2 ${isTabletOrMobile && 'w-72'}`}>
                <h1 className={`text-red-600 font-extrabold inline leading-10 ${isDesktopOrLaptop ? 'text-5xl' : 'text-3xl'}`}>{spot.name}</h1>
                <p>335 reviews</p>
                <p>other info</p>
                <p>Open</p>
              </div>
            </div>
            <div className='flex-initial'>
              <button
                className='font-bold text-red-600 focus:outline-none border rounded border-white py-3 px-8 w-44'
              >
                See All Photos
              </button>
            </div>
          </div>
        </div>
        
      </div>
      {/* Container for skate spot information */}
      <div className='mt-6'>
        <div className='min-w-300'>
          <div className='max-w-295 mx-auto my-0'>
            <div className='leading-loose mx-auto my-0 w-2/3'>
                <div className='flex w-full'>
                  {/* buttons for writing reviews, adding photos, follow skate spot */}
                  <div className='w-2/3 max-w-295'>
                    <div className='border-b border-gray-200'>
                      <button
                      className='text-black rounded border-red-600 border mb-6 mr-6 py-1 px-6 font-bold'
                    >
                      Write Review
                    </button>
                    <button
                      className='text-black rounded border-red-600 border py-1 px-6 font-bold'
                    >
                      Add photo
                    </button>
                    </div>
                    
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                  </div>
                  {/* fixed side panel for directions and photos */}
                  <div className='w-1/3 max-h-48 sticky ml-12 border rounded border-gray-200'>
                    <div>
                      <div> sticky </div>
                    </div>
                  </div>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  );
}