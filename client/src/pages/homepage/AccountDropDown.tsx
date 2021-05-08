import React, { useContext } from 'react';
import { useLogoutUserMutation } from 'src/generated/graphql';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from '../../graphql/reactive-variables/accessToken';

interface Props {}

export const AccountDropDown: React.FC<Props> = () => {
  const [logout, { client }] = useLogoutUserMutation();
  const { setIsLoggedIn } = useContext(TokenContext);

  return (
    <div className="absolute right-8 w-52 h-auto border-2 rounded border-black bg-white shadow-2xl z-50">
      <button
        onClick={async () => {
          await logout();
          await accessToken('');
          await setIsLoggedIn(false);
          await client.resetStore();
        }}
      >
        Logout
      </button>
      <p>h</p>
      <p>h</p>
    </div>
  );
};
