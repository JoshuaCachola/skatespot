import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import SkateSpot2 from '../assets/SkateSpot2.jpg';
import { Header } from './components/Header';

interface Props {

}

const spot = {
  name: 'Milpitas Skate Park',
  imgs: [SkateSpot2, SkateSpot2]
};

export const SkateSpot: React.FC<Props> = () => {
  return(
    <div>
      <Header />
      {/* image carousel, skate spot information */}
      <div className='w-4/6 z-0 my-0 mx-auto'>
        <div className='absolute flex m-auto items-end box-border py-10 px-16'>
          <div className='flex'>
            <div className='z-30'>
              <h1 className='font-bold text-red-600 text-4xl'>{spot.name}</h1>
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
        <div className='z-20 max-h-110 w-full bg-black'>
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
      <div className='mt-6'>
        <div className='min-w-300'>
          <div className='max-w-295'>
            <div className='leading-loose mx-auto my-0 w-2/3'>
              <div className='w-2/3 mx-auto my-0'>
                <div className='flex w-full'>
                  {/* buttons for writing reviews, adding photos, follow skate spot */}
                  <div className='w-2/3 border-b border-gray-400'>
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
                  {/* fixed side panel for directions and photos */}
                  <div className='w-1/3 sticky ml-12'>
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
    </div>
  );
}