import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from 'react-click-away-listener';
import { useGetUserQuery, useLogoutUserMutation } from 'src/generated/graphql';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';
import BoardTap from '../../assets/board-tap.png';
import { useMediaQuery } from 'react-responsive';
import { HEADER } from '../../utils/constants';

interface Props {
  type: string;
}

const DropDownMenu: React.FC<Props> = ({ type }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 937px)' });

  const { data } = useGetUserQuery({ fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logout, { client }] = useLogoutUserMutation();
  const { isLoggedIn, setIsLoggedIn } = useContext(TokenContext);

  const handleClickAway = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {isMobile ? (
        <div
          className="border-black rounded-sm text-center py-2 bg-white hover:bg-black w-14 hover:bg-opacity-10 mx-6 text-2xl border-l border-t border-r-4 border-b-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </div>
      ) : (
        <div className="flex">
          <div className="rounded-l-sm rounded-r-none">
            <div
              className={`text-gray-400 hover:bg-black hover:bg-opacity-30 hover:text-gray-500 flex justify-center align-middle overflow-hidden rounded-r-none bg-white border-l border-t border-b-4 rounded-l ${
                type === HEADER ? 'border-black' : 'border-white'
              }`}
            >
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
          <div
            className={`rounded rounded-l-none border-r-4 border-t border-b-4 border-l bg-black bg-opacity-10 hover:bg-opacity-30  ${
              type === HEADER ? 'border-black' : 'border-white'
            }`}
          >
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
                    <div className="flex">
                      <img
                        src={data.getUser.profilePicture}
                        alt="profile-menu"
                        className="h-11 w-10 rounded border-b-4 border-r-4 border-t border-l border-black"
                      />
                      <span className="ml-2 my-auto font-semibold">{data?.getUser.username}</span>
                    </div>
                  ) : (
                    <div className="flex items-center h-10 w-5 my-auto mx-2">
                      <div className="border px-2 py-1 rounded bg-gray-200 text-xl">
                        <FontAwesomeIcon icon={['fas', 'user']} />
                      </div>
                      <span className="ml-2 my-auto font-semibold">{data?.getUser.username}</span>
                    </div>
                  )}
                </Link>
                {isMobile && (
                  // if logged in show Create Skate Spot and Log out link for non-mobile query
                  <div className="flex m-2 font-semibold">
                    <div className="border-t border-l border-r-4 border-b-4 border-black rounded p-1 bg-white">
                      <img src={BoardTap} alt="" className="w-4 h-4" />
                    </div>
                    <Link to="/create-skate-spot" className="ml-5">
                      Create Skate Spot
                    </Link>
                  </div>
                )}
                <div className="w-11/12 border-b my-2 mx-auto" />
                <div className="flex m-2">
                  <div className="px-1 mr-5 border-l border-t border-r-4 border-b-4 border-black rounded">
                    <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
                  </div>
                  <Link
                    to="/"
                    onClick={async () => {
                      await logout();
                      accessToken('');
                      await client.clearStore();
                      setIsLoggedIn(false);
                    }}
                    className="font-semibold"
                  >
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              // if not logged in show Log In and Sign Up link for mobile query
              <div className="m-2">
                <div className="flex">
                  <div className="px-1 mr-5 border-l border-t border-r-4 border-b-4 border-black rounded">
                    <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
                  </div>
                  <Link to="/login" className="font-semibold">
                    Log In
                  </Link>
                </div>
                <div className="border-b my-1" />
                <div className="flex">
                  <div className="px-1 mr-5 border-l border-t border-r-4 border-b-4 border-black rounded">
                    <FontAwesomeIcon icon={['fas', 'user-plus']} />
                  </div>
                  <Link to="/register" className="font-semibold">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default DropDownMenu;
