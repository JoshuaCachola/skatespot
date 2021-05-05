import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useGetUserReviewsQuery } from 'src/generated/graphql';
import { me } from 'src/graphql/reactive-variables/me';
import SearchResultsFull1 from '../assets/SearchResultsFull1.jpg';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ReviewText } from './components/ReviewText';

interface Props {}

const user = {
  username: 'crookiemonster',
  firstName: 'Joshua',
  lastName: 'Cachola',
  stance: 'regular',
};

export const UserProfile: React.FC<Props> = () => {
  const { data, loading, error } = useGetUserReviewsQuery({
    variables: { userId: 2 },
  });

  console.log(data, me());
  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <Header />
      {/* User information and photo */}
      <div className="bg-gray-100 absolute h-32 w-screen z-0 top-28" />
      <div className="relative flex max-w-4xl my-5 mx-auto z-50">
        {/* Account profile picture */}
        <div className="rounded mt-5 mb-8 ml-20">
          <img alt="profile" src={SearchResultsFull1} width={200} height={200} className="rounded" />
        </div>
        {/* Account information */}
        <div className="my-4 ml-28 leading-normal">
          <div>
            <h1 className="font-light text-3xl mb-4">{user.username}</h1>
            <h2 className="font-semibold">
              <span>{user.firstName}</span>
              <span className="uppercase">&nbsp;{user.lastName[0]}.</span>
            </h2>
          </div>
          <p className="mb-4">
            <span className="font-semibold">Skate Stance</span> <span className="uppercase">{user.stance}</span>
          </p>
        </div>
      </div>
      {/* Reviews */}
      <div className="max-w-4xl border-t-2 border-grey-200 my-10 mx-auto">
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
                  <div className="text-base text-black font-bold">
                    <span>
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </span>
                  </div>
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
