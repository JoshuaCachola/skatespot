import React from 'react';
import { useGetUserQuery, useGetUserReviewsLazyQuery } from 'src/generated/graphql';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ReviewText } from './components/ReviewText';
import { AverageReviewStars } from './components/AverageReviewStars';
import { RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const user = {
  username: 'crookiemonster',
  firstName: 'Joshua',
  lastName: 'Cachola',
  stance: 'regular',
};

export const UserProfile: React.FC<RouteComponentProps> = ({ history }) => {
  const { data: userData, loading: userLoading, error: userError } = useGetUserQuery({
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

  if (loading || userLoading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>reviews error</h1>;
  }

  if (userError) {
    return <h1>user error</h1>;
  }

  return (
    <div>
      <Header />
      {/* User information and photo */}
      <div className="bg-gray-100 absolute h-32 w-screen z-10 top-28" />
      <div className="relative flex max-w-4xl my-5 mx-auto z-20">
        {/* Account profile picture */}
        <div className="rounded mt-5 mb-8 ml-20">
          <div className="absolute">
            <div
              className="inline-block text-white border rounded bg-gray-300 text-center px-1 m-1 cursor-pointer hover:bg-gray-500 border-gray-300 hover:border-gray-500"
              onClick={() => handleOnClick()}
            >
              <FontAwesomeIcon icon={['fas', 'image']} />
              <span className="vertical-middle inline-block">&nbsp;Add a photo</span>
            </div>
          </div>
          {userData?.getUser.profilePicture ? (
            <img alt="profile" src={userData?.getUser.profilePicture} width={200} height={200} className="rounded" />
          ) : (
            <div className="text-8xl text-gray-400 border bg-white px-12 py-3 rounded-md">
              <FontAwesomeIcon icon={['fas', 'user']} />
            </div>
          )}
        </div>
        {/* Account information */}
        <div className="my-4 ml-28 leading-normal">
          <div>
            <h1 className="font-light text-3xl mb-4">{userData?.getUser.username}</h1>
            <h2 className="font-semibold">
              <span>{userData?.getUser.firstName}</span>
              <span className="uppercase">&nbsp;{userData?.getUser.lastName[0]}.</span>
            </h2>
          </div>
          <p className="mb-4 w-52">
            <span className="font-semibold">Skate Stance</span> <span className="uppercase">{user.stance}</span>
          </p>
        </div>
      </div>
      {/* Reviews */}
      <div className="max-w-4xl border-t border-grey-200 my-10 mx-auto">
        <div className="text-lg font-bold text-red-600 mt-6 ml-2">
          <h1>Reviews</h1>
        </div>
        {!loading &&
          data?.getUserReviews.map((review) => {
            return (
              <div key={review.id} className="border-b border-gray-400 py-10">
                {/* User information */}
                <div className="flex">
                  {/* Profile image */}
                  <div className="rounded h-24 w-24">
                    <img src={SkateSpot1} alt="profile-avatar" />
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
                    <span>&nbsp;04/28/2021</span>
                  </div>
                </div>
                {/* review */}
                <div className="break-words font-light">
                  <ReviewText review={review.review} />
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};
