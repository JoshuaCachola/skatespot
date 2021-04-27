import React from 'react';
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
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)'});
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)'});
  return(
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className={`${isDesktopOrLaptop && 'w-5/6'} ${isTabletOrMobile && 'w-full'} mx-auto my-0 z-0`}>
        <div className='absolute flex m-auto items-end box-border py-10 px-16 top-64'>
          <div className='flex'>
            <div className='z-30'>
              <h1 className='text-red-600 font-bold text-5xl'>{spot.name}</h1>
            </div>
            <div className='z-30'>
              <button
                className='font-bold text-red-600 focus:outline-none'
              >
                See All Photos
              </button>
            </div>
          </div>
        </div>
        <div className='z-20 w-full bg-black'>
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
      </div>
      {/* Container for skate spot information */}
      <div className='mt-6'>
        <div className='min-w-300'>
          <div className='max-w-295 mx-auto my-0'>
            <div className='leading-loose mx-auto my-0 w-2/3'>
                <div className='flex w-full'>
                  {/* buttons for writing reviews, adding photos, follow skate spot */}
                  <div className='w-2/3 max-w-295'>
                    <div className='border-b border-gray-400'>
                      <button
                      className='text-black rounded border-red-600 border mb-6 mr-6'
                    >
                      Write Review
                    </button>
                    <button
                      className='text-black rounded border-red-600 border'
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
                  <div className='w-1/3 max-h-48 sticky ml-12 border rounded border-gray-400'>
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