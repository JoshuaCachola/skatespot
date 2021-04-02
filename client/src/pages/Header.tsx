import React from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from 'src/accessToken';
import { useLogoutUserMutation } from 'src/generated/graphql';

interface Props {

}

export const Header: React.FC<Props> = () => {
  const [logout, {client}] = useLogoutUserMutation();
  return (
    <header>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
      <div>
        <Link to='/register'>Register</Link>
      </div>
      <div>
        <Link to='/private'>Private</Link>
      </div>
      <div>
        <Link to='/create-skate-spot'>Create Spot</Link>
      </div>
      <div>
        <button
          onClick={async () => {
            await logout();
            setAccessToken('');
            await client.resetStore();
          }}
        >Logout</button>
      </div>
    </header>
  );
}