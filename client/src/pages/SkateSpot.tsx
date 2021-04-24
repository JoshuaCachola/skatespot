import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import SkateSpot2 from '../assets/SkateSpot2.jpg';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { Header } from './components/Header';

interface Props {

}

const spot = {
  name: 'Milpitas Skate Park',
  imgs: [SkateSpot2, SkateSpot1]
};

export const SkateSpot: React.FC<Props> = () => {
  return(
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className='w-5/6 z-0 my-0 mx-auto'>
        <div className='absolute flex m-auto items-end box-border py-10 px-16'>
          <div className='flex'>
            <div className='z-30'>
              <h1 className='font-bold text-red-600 text-5xl'>{spot.name}</h1>
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
        <div className='z-20 max-h-110 min-w-carousel bg-black'>
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
                <div key={idx} className=' flex justify-center'>
                  <img
                    src={img}
                    alt={`img-${idx}`}
                    height={426}
                    width={745}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      {/* Container for skate spot information */}
      <div className='flex'>
        {/* buttons for writing reviews, adding photos, follow skate spot */}
        <div className='leading-loose my-5 flex'>
          <button
            className='text-black'
          >
            Write Review
          </button>
          <button
            className='text-black'
          >
            Add photo
          </button>
        </div>
        {/* Top 5 tricks landed */}
        <div>

        </div>
      </div>
      {/* fixed side panel for directions and photos */}
      <div>
        <div>

        </div>
      </div>
    </div>
  );
}