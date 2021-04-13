import React from 'react';
import { useLogoutUserMutation } from 'src/generated/graphql';
import { accessToken } from '../../graphql/reactive-variables/accessToken'

interface Props {

}

export const AccountDropDown: React.FC<Props> = () => {
  const [logout, {client}] = useLogoutUserMutation();
  return(
    <div>
      <button
        onClick={async () => {
          await logout();
          await accessToken('');
          await client.resetStore();
        }}
      >
        Logout
      </button>
    </div>
  );
}