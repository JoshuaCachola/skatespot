import React from 'react';
import { Header } from './components/Header';
import { Carousel } from 'react-responsive-carousel';
import Map from './components/Map';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useGetSkateSpotsQuery } from '../generated/graphql';
import { Footer } from './components/Footer';
import { AverageReviewStars } from './components/AverageReviewStars';
// import { searchResults } from 'src/graphql/reactive-variables/searchResults';
interface Props {}

export const SkateSpotResults: React.FC<Props> = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const { data, loading, error, fetchMore } = useGetSkateSpotsQuery({
    fetchPolicy: 'network-only',
    variables: { limit: 5 },
  });

  // const [skateSpots, setSkateSpots] = React.useState(searchResults());

  // useEffect(() => {
  //   if (!skateSpots.length && data?.getSkateSpots) {
  //     setSkateSpots(data?.getSkateSpots);
  //   }
  // }, [data?.getSkateSpots, skateSpots]);

  const handleMoreResults = async () => {
    fetchMore({
      variables: { cursor: data?.getSkateSpots[data.getSkateSpots.length - 1].id, limit: 5 },
    });
  };
  // React.useEffect(() => {
  //   if (skateSpots.length === 0 && data?.getSkateSpots) {
  //     setSkateSpots(data?.getSkateSpots);
  //   }
  // }, [data?.getSkateSpots, skateSpots.length]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <Header />
      <div className="flex border-t border-gray-100 mb-16 overflow-hidden">
        <ul
          className={`mt-4 mx-4 pr-1 h-screen ${isDesktopOrLaptop ? 'w-1/2 overflow-y-scroll' : 'w-2/3 mx-auto my-0'}`}
        >
          {data?.getSkateSpots &&
            data.getSkateSpots.map((result, resultIdx) => {
              return (
                <Link
                  className="z-0"
                  key={resultIdx}
                  to={{
                    pathname: `/skate-spot/${result.name}`,
                    state: { skateSpot: data.getSkateSpots[resultIdx] },
                  }}
                >
                  <li className="flex rounded border-2 mb-7 border-gray-100 hover:shadow-xl hover:bg-gray-50">
                    {/* skate spot img carousel */}
                    <div
                      className="m-6 w-40 z-50"
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
                        {result.imageUrls &&
                          JSON.parse(result.imageUrls).map((img, idx) => {
                            return (
                              <div
                                key={idx}
                                className="rounded w-40 h-40 bg-black flex items-center justify-center overflow-hidden"
                              >
                                <img src={img} alt={`img-${idx}`} className="min-w-full min-h-full flex-shrink-0" />
                              </div>
                            );
                          })}
                      </Carousel>
                    </div>
                    {/* skatespot information */}
                    <div className="w-full my-8">
                      {/* skatespot name/rating and address*/}
                      <div className="flex justify-between">
                        {/* name and rating */}
                        <div>
                          <div className="">
                            <h4 className="text-xl font-bold">
                              {resultIdx + 1}.&nbsp;<span>{result.name}</span>
                            </h4>
                          </div>
                          <div className="flex my-2">
                            {/* stars */}
                            <div className="flex text-xs text-gray-500 font-bold">
                              <div className="flex">
                                <AverageReviewStars
                                  reviewsCount={result.reviewsCount}
                                  reviewsDistribution={JSON.parse(result.reviewsDistribution)}
                                />
                              </div>
                            </div>
                            {/* number of reviews */}
                            <div>
                              <span>&nbsp;{result.reviewsCount}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">
                              <span>{result.categoryName}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mr-2">
                          <address>
                            <p>
                              <span className="text-xs">{result.street}</span>
                            </p>
                          </address>
                        </div>
                      </div>
                      {/* what is there to skate, skating conditions etc... */}
                      <div></div>
                    </div>
                  </li>
                </Link>
              );
            })}
          <button onClick={handleMoreResults}>More Results</button>
        </ul>
        {/* map of locations */}
        {isDesktopOrLaptop ? (
          <div className="w-1/2 h-screen border-t">
            <Map locations={data?.getSkateSpots} />
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};
