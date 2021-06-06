import React from 'react';
import { useGetUserQuery, useGetUserReviewsLazyQuery } from 'src/generated/graphql';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ReviewText } from './components/ReviewText';
import { AverageReviewStars } from './components/AverageReviewStars';
import { RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReviewImages } from './components/ReviewImages';
import { useMediaQuery } from 'react-responsive';
import { ErrorBanner } from './components/ErrorBanner';

const user = {
  username: 'crookiemonster',
  firstName: 'Joshua',
  lastName: 'Cachola',
  stance: 'regular',
};

export const UserProfile: React.FC<RouteComponentProps> = ({ history }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });
  const { data: userData, error: userError } = useGetUserQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const [userReviews, { data, loading, error }] = useGetUserReviewsLazyQuery();

  const handleOnClick = () => {
    history.push('/user-photos/add');
  };

  React.useEffect(() => {
    if (userData?.getUser) {
      userReviews({ variables: { userId: userData.getUser.id } });
    }
  }, [userReviews, userData?.getUser]);

  if (error) {
    return <h1>reviews error</h1>;
  }

  if (userError) {
    return <h1>user error</h1>;
  }

  return (
    <div className="bg-gray-50">
      <Header />
      {/* User information and photo */}
      <div
        className={`bg-gray-100 absolute w-screen z-10 top-28 border-b border-t border-gray-200 ${
          isMobile ? 'h-28' : 'h-40'
        }`}
      />
      {error ||
        (userError && (
          <ErrorBanner message={userError ? "Error loading user's profile..." : "Error loading user's reviews..."} />
        ))}
      <div className={`relative h-full max-w-7xl mb-5 mx-auto ${isMobile && 'w-full'}`}>
        <section className={`relative flex my-5 z-20 ${isMobile ? 'w-full mx-2' : 'mx-auto'}`}>
          {/* Account profile picture */}
          <div className={`rounded mt-5 mb-8 ${isMobile ? 'mx-5' : 'ml-20'}`}>
            <div className="absolute">
              <div
                className="inline-block text-white border rounded bg-gray-400 text-center px-1 m-1 cursor-pointer hover:bg-gray-500 border-gray-400 hover:border-gray-500"
                onClick={() => handleOnClick()}
              >
                <FontAwesomeIcon icon={['fas', 'image']} />
                {!isMobile && <span className="vertical-middle inline-block">&nbsp;Add a photo</span>}
              </div>
            </div>
            {userData?.getUser.profilePicture ? (
              <div className={`h-auto ${isMobile ? 'w-24 h-auto' : 'w-52'}`}>
                <img
                  alt="profile"
                  src={userData?.getUser.profilePicture}
                  width={200}
                  height={200}
                  className="object-contain rounded border-b-4 border-r-4 border-t border-l border-black"
                />
              </div>
            ) : (
              <div
                className={`text-gray-400 bg-white rounded-md border-b-4 border-r-4 border-t border-l border-black ${
                  isMobile ? 'text-7xl px-8 py-3' : 'text-8xl px-12 py-3'
                }`}
              >
                <FontAwesomeIcon icon={['fas', 'user']} />
              </div>
            )}
          </div>
          {/* Account information */}
          <div className={`my-4 leading-normal ${isMobile ? 'w-72' : 'ml-28'}`}>
            <div className={`font-light ${isMobile ? 'text-lg' : 'text-3xl'}`}>
              <h1 className="mb-4">{userData?.getUser.username}</h1>
              <h2 className="font-semibold">
                <span className="uppercase">{userData?.getUser.firstName[0]}</span>
                <span>{userData?.getUser.firstName.slice(1)}</span>
                <span className="uppercase">&nbsp;{userData?.getUser.lastName[0]}.</span>
              </h2>
            </div>
            <p className="mb-4 w-52">
              <span className="font-semibold">Skate Stance</span> <span className="uppercase">{user.stance}</span>
            </p>
          </div>
        </section>
        {/* Reviews */}
        {loading && (
          <div className="text-lg font-semibold">
            <span>Fetching reviews...</span>
          </div>
        )}
        <section className={`max-w-4xl mx-auto h-screen ${isMobile && 'w-72'}`}>
          <div className="text-xl font-bold text-red-500 mt-6 ml-5">
            <h1>Reviews</h1>
          </div>
          {!loading &&
            data?.getUserReviews.map((review) => {
              return (
                <div key={review.id} className="border-b border-gray-200 py-10 mx-5">
                  {/* User information */}
                  <div className="flex">
                    {/* Profile image */}
                    <div className="rounded h-24 w-24">
                      <img
                        src={userData?.getUser.profilePicture}
                        alt="profile-avatar"
                        className="border-b-4 border-r-4 border-t border-l border-black"
                      />
                    </div>
                    {/* User information */}
                    <div className="ml-2">
                      {/* username */}
                      <div className="font-bold text-base">
                        <span>{review.skateSpot.name}</span>
                      </div>
                      <div className="text-sm">
                        <span>
                          {review.skateSpot.city}, {review.skateSpot.state}
                        </span>
                      </div>
                      {/* Add reviews images */}
                      <div></div>
                    </div>
                  </div>
                  {/* User rating */}
                  <div className="flex items-center mb-5">
                    {/* {review} */}
                    <AverageReviewStars rating={review.rating} />
                    {/* Review date */}
                    <div className="text-sm">
                      <span>&nbsp;{review.createdAt.slice(0, 10)}</span>
                    </div>
                  </div>
                  {/* review */}
                  <div className="break-words font-light">
                    <ReviewText review={review.review} />
                  </div>
                  <ReviewImages images={JSON.parse(review.imageUrls)} />
                </div>
              );
            })}
        </section>
      </div>
      <Footer />
    </div>
  );
};
