import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import SearchResultsFull1 from '../assets/SearchResultsFull1.jpg';
import SkateSpot1 from '../assets/SkateSpot1.jpg';
import { Header } from './components/Header';

interface Props {}

const user = {
  username: 'crookiemonster',
  firstName: 'Joshua',
  lastName: 'Cachola',
  stance: 'regular',
};

export const UserProfile: React.FC<Props> = () => {
  return (
    <div>
      <Header />
      {/* User information and photo */}
      <div className="flex max-w-4xl my-5 mx-auto">
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
      <div className="max-w-4xl border-t-2 border-grey-200 my-0 mx-auto">
        <div className="text-lg font-bold text-red-600 mt-6 ml-2">
          <h1>Reviews</h1>
        </div>
        <div className="border-b border-gray-400 py-10">
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
                <span>Crookiemonster</span>
              </div>
              <div className="text-sm">
                <span>San Jose, CA</span>
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
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida lorem ac ligula fermentum
              convallis. Etiam non ipsum eget quam elementum vestibulum. Aenean finibus purus et eros consequat egestas.
              Donec efficitur rutrum nisl at consequat.
              <br />
              <br />
              Cras id orci quis ligula rhoncus aliquam sed tristique mauris. Sed et sagittis odio. Donec mollis
              venenatis nisi id vulputate. Duis sit amet dui at arcu posuere suscipit. Nulla ullamcorper tincidunt
              sagittis.Maecenas ultrices posuere lacus, id finibus leo interdum at. Cras tincidunt, orci vitae
              pellentesque euismod, lectus nunc sagittis ligula, sed vehicula nunc nisi iaculis velit. Ut in suscipit
              nisi, quis ultrices tellus. Donec pulvinar elementum lacus, non interdum massa varius sit amet. Fusce ut
              commodo tortor. Mauris ornare eget est vitae semper. Maecenas vestibulum semper pretium. Duis sed orci
              sem. Nunc ornare porttitor ipsum. Nunc pharetra vehicula fermentum. Nullam non justo accumsan, tincidunt
              nisi nec, viverra mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
              mus.
            </div>
          </div>
        </div>
        <div className="border-b border-gray-400 py-10">
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
                <span>Crookiemonster</span>
              </div>
              <div className="text-sm">
                <span>San Jose, CA</span>
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
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida lorem ac ligula fermentum
              convallis. Etiam non ipsum eget quam elementum vestibulum. Aenean finibus purus et eros consequat egestas.
              Donec efficitur rutrum nisl at consequat.
              <br />
              <br />
              Cras id orci quis ligula rhoncus aliquam sed tristique mauris. Sed et sagittis odio. Donec mollis
              venenatis nisi id vulputate. Duis sit amet dui at arcu posuere suscipit. Nulla ullamcorper tincidunt
              sagittis.Maecenas ultrices posuere lacus, id finibus leo interdum at. Cras tincidunt, orci vitae
              pellentesque euismod, lectus nunc sagittis ligula, sed vehicula nunc nisi iaculis velit. Ut in suscipit
              nisi, quis ultrices tellus. Donec pulvinar elementum lacus, non interdum massa varius sit amet. Fusce ut
              commodo tortor. Mauris ornare eget est vitae semper. Maecenas vestibulum semper pretium. Duis sed orci
              sem. Nunc ornare porttitor ipsum. Nunc pharetra vehicula fermentum. Nullam non justo accumsan, tincidunt
              nisi nec, viverra mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
              mus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
