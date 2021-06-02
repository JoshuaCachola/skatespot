import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from 'react-click-away-listener';
import { useGetUserQuery, useLogoutUserMutation } from 'src/generated/graphql';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';

interface Props {}

const DropDownMenu: React.FC<Props> = () => {
  const { data } = useGetUserQuery({ fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logout, { client }] = useLogoutUserMutation();
  const { setIsLoggedIn } = useContext(TokenContext);

  const handleClickAway = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="rounded-l-sm rounded-r-none">
          <div className=" text-gray-400 hover:bg-black hover:bg-opacity-10 hover:text-gray-500 flex justify-center align-middle overflow-hidden rounded-l-sm rounded-r-none bg-white">
            <Link to="/user-profile">
              {data?.getUser.profilePicture ? (
                <img src={data.getUser.profilePicture} alt="profile-image" className="h-11 w-10" />
              ) : (
                <div className="h-10 w-5 my-auto py-2 mx-2 pl-0.5">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="rounded-r-sm roudner-l-none border border-black border-opacity-10 bg-black bg-opacity-20">
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
      {isMenuOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="absolute mt-1 right-0 w-52 h-auto border-t border-l border-r-4 border-b-4 rounded border-black bg-white shadow-2xl z-50">
            <Link to="/user-profile" className="flex m-2">
              {data?.getUser.profilePicture ? (
                <img src={data.getUser.profilePicture} alt="profile-image" className="h-11 w-10 rounded" />
              ) : (
                <div className="h-10 w-5 my-auto py-2 mx-2 pl-0.5">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                </div>
              )}
              <span className="ml-2 my-auto font-semibold">{data?.getUser.username}</span>
            </Link>
            <div className="w-11/12 border-b mx-auto" />
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
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default DropDownMenu;
