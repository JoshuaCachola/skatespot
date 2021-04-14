import React, { useContext } from 'react';
import { useLogoutUserMutation } from 'src/generated/graphql';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from '../../graphql/reactive-variables/accessToken'

interface Props {

}

export const AccountDropDown: React.FC<Props> = () => {
  const [logout, {client}] = useLogoutUserMutation();
  const { setIsLoggedIn } = useContext(TokenContext);

  return(
    <div>
      <button
        onClick={async () => {
          await logout();
          await accessToken('');
          await setIsLoggedIn(false);
          await client.resetStore();
        }}
      >
        
      </button>
    </div>
  );
}