import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from 'react-click-away-listener';
import { useGetUserQuery, useLogoutUserMutation } from 'src/generated/graphql';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';
import { useMediaQuery } from 'react-responsive';

interface Props {}

const DropDownMenu: React.FC<Props> = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 702px)' });
  const { data } = useGetUserQuery({ fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logout, { client }] = useLogoutUserMutation();
  const { isLoggedIn, setIsLoggedIn } = useContext(TokenContext);

  const handleClickAway = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // if (isTabletOrMobile) {
  //   return (
  //     <div className='relative'>

  //     </div>
  //   );
  // }
  return (
    <div className="relative">
      {isTabletOrMobile ? (
        <div
          className="border-2 border-black rounded px-1 bg-white hover:bg-black hover:bg-opacity-10 mx-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </div>
      ) : (
        <div className="flex">
          <div className="rounded-l-sm rounded-r-none">
            <div className=" text-gray-400 hover:bg-black hover:bg-opacity-10 hover:text-gray-500 flex justify-center align-middle overflow-hidden rounded-l-sm rounded-r-none bg-white">
              <Link to="/user-profile">
                {data?.getUser.profilePicture ? (
                  <img src={data.getUser.profilePicture} alt="profile" className="h-11 w-10" />
                ) : (
                  <div className="h-10 w-5 my-auto py-2 mx-2 pl-0.5">
                    <FontAwesomeIcon icon={['fas', 'user']} />
                  </div>
                )}
              </Link>
            </div>
          </div>
          <div className="rounded-r-sm roudner-l-none border border-black border-opacity-10 bg-black bg-opacity-20 hover:bg-opacity-30">
            <div className="h-10 w-5">
              <div
                className="pt-2 align-middle cursor-pointer text-white text-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FontAwesomeIcon icon={['fas', 'angle-down']} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isMenuOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="absolute mt-1 right-0 w-52 h-auto border-t border-l border-r-4 border-b-4 rounded border-black bg-white shadow-2xl z-50">
            {isLoggedIn ? (
              <>
                <Link to="/user-profile" className="flex m-2">
                  {data?.getUser.profilePicture ? (
                    <img
                      src={data.getUser.profilePicture}
                      alt="profile-menu"
                      className="h-11 w-10 rounded border-b-4 border-r-4 border-t border-l border-black"
                    />
                  ) : (
                    <div className="h-10 w-5 my-auto py-2 mx-2 pl-0.5">
                      <FontAwesomeIcon icon={['fas', 'user']} />
                    </div>
                  )}
                  <span className="ml-2 my-auto font-semibold">{data?.getUser.username}</span>
                </Link>
                {isMobile && (
                  <div className="m-2 font-semibold">
                    <Link to="/create-skate-spot">Create Skate Spot</Link>
                  </div>
                )}
                <div className="w-11/12 border-b my-2 mx-auto" />
                <Link
                  to="/"
                  onClick={async () => {
                    await logout();
                    accessToken('');
                    await client.clearStore();
                    setIsLoggedIn(false);
                  }}
                  className="m-2 font-semibold"
                >
                  Logout
                </Link>
              </>
            ) : (
              <div className="flex flex-col m-2">
                <Link to="/login" className="font-semibold">
                  Log In
                </Link>
                <div className="border-b my-1" />
                <Link to="sign-up" className="font-semibold">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default DropDownMenu;
