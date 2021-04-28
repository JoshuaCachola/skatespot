import React from 'react';
import { Header } from './components/Header';
// import SearchResults1 from '../assets/SearchResults1.jpg';
// import SearchResults2 from '../assets/SearchResults2.jpg';
import { Carousel } from 'react-responsive-carousel';
import Map from './components/Map';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
// import { Footer } from './components/search/Footer';
import { useGetSkateSpotsQuery } from '../generated/graphql';
interface Props {

}

export const SkateSpotResults: React.FC<Props> = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)'});
  const {data, loading, error} = useGetSkateSpotsQuery({fetchPolicy: 'network-only'});

  if (loading) {
    return <h1>loading...</h1>
  }

  if (error) {
    console.log(error);
    return <h1>errors...</h1>
  }

  
  return (
    <div>
      <Header />
      <div className='flex border-t border-gray-100'>
        <ul className={`mt-4 mx-4 pr-1 h-screen ${isDesktopOrLaptop ? 'w-1/2 overflow-y-scroll' : 'w-2/3 mx-auto my-0'}`}>
          {!loading && data?.getSkateSpots && data.getSkateSpots.map((result) => {
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
                    className='m-8 w-52 z-50'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Carousel 
                      showThumbs={false}
                      infiniteLoop={true} 
                      // dynamicHeight={true}
                      emulateTouch={true}
                      showIndicators={false}
                      showStatus={false}
                    >
                      {result.imageUrls && JSON.parse(result.imageUrls).map((img, idx) => {
                        return (
                          <div 
                            key={idx}
                            className='rounded w-52 h-52 bg-black flex items-center justify-center overflow-hidden'
                          >
                            <img
                              src={img}
                              alt={`img-${idx}`}
                              className='min-w-full min-h-full flex-shrink-0'
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
                              {result.street}
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
            <Map locations={data?.getSkateSpots} />
          </div>
          :
          null
        }
      </div>
    </div>
  );
}