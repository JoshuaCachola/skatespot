import React from 'react';
import { Header } from './components/Header';
import SearchResults1 from '../assets/SearchResults1.jpg';
import SearchResults2 from '../assets/SearchResults2.jpg';
import { Carousel } from 'react-responsive-carousel';
import Map from './components/Map';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Footer } from './components/search/Footer';
interface Props {

}

const results = [
  {
    id: 1,
    name: 'Wallenberg High School',
    address: '40 Vega St, San Francisco, CA 94115',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 2,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 3,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 4,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 5,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 6,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 7,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 8,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 9,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  },
  {
    id: 10,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132',
    imgs: [SearchResults1, SearchResults2]
  }
];

export const SkateSpotResults: React.FC<Props> = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)'});
  return (
    <div>
      <Header />
      <div className='flex border-t border-gray-100'>
        <ul className={`mt-4 mx-4 pr-1 h-screen ${isDesktopOrLaptop ? 'w-1/2 overflow-y-scroll' : 'w-2/3 mx-auto my-0'}`}>
          {results && results.map((result) => {
            return (
              <Link
                className='z-0'
                key={result.id}
                to='/skate-spot'
              >
                <li 
                  className='flex rounded border-2 mb-7 border-gray-100'
                >
                  {/* skate spot img carousel */}
                  <div 
                    className='m-8 w-52 h-full z-50'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Carousel 
                      showThumbs={false}
                      infiniteLoop={true} 
                      dynamicHeight={true}
                      emulateTouch={true}
                      showIndicators={false}
                      showStatus={false}
                    >
                      {result.imgs && result.imgs.map((img, idx) => {
                        return (
                          <div key={idx}>
                            <img
                              src={img}
                              alt={`img-${idx}`}
                            />
                          </div>
                        )
                      })}
                    </Carousel>
                  </div>
                  {/* skatespot information */}
                  <div className='w-full my-8'>
                    {/* skatespot name/rating and address*/}
                    <div className='flex justify-between'>
                      {/* name and rating */}
                      <div className=''>
                        <h1 className='text-xl font-bold'>{result.name}</h1>
                      </div>
                      <div className=''>
                        <address>
                          <p>
                            <span className='text-s'>
                              {result.address}
                            </span>
                          </p>
                        </address>
                      </div>
                    </div>
                    {/* what is there to skate, skating conditions etc... */}
                    <div>

                    </div>
                  </div>
                </li>
              </Link>
            )
          })
          }
        </ul>
        {/* map of locations */}
        {isDesktopOrLaptop ?
          <div className='w-1/2 h-screen border-t'>
            <Map />
          </div>
          :
          null
        }
      </div>
      <Footer />
    </div>
  );
}