import { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from 'react-click-away-listener';
import { useGetUserQuery, useLogoutUserMutation } from 'src/generated/graphql';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';

interface Props {}

const Account: React.FC<Props> = () => {
  const { data } = useGetUserQuery({ fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logout, { client }] = useLogoutUserMutation();
  const { setIsLoggedIn } = useContext(TokenContext);

  const handleClickAway = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex">
        <div className="rounded-l-sm rounded-r-none">
          <div className=" text-gray-300 hover:bg-gray-100 hover:text-gray-500 flex justify-center align-middle overflow-hidden rounded-l-sm rounded-r-none">
            <Link to="/user-profile">
              {data?.getUser.profilePicture ? (
                <img src={data.getUser.profilePicture} alt="" className="h-11 w-10" />
              ) : (
                <div className="h-10 w-5 my-auto py-2 mx-2 pl-0.5">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="rounded-r-sm roudner-l-none border border-black border-opacity-30 bg-black bg-opacity-20">
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
          <div className="absolute top-20 right-4 w-52 h-auto border-2 rounded border-black bg-white shadow-2xl z-50">
            <Link
              to="/"
              onClick={async () => {
                await logout();
                accessToken('');
                await client.clearStore();
                setIsLoggedIn(false);
              }}
            >
              Logout
            </Link>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};

export default withRouter(Account);
