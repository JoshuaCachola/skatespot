import React from 'react';
import { Link } from 'react-router-dom';
import { accessToken } from '../graphql/reactive-variables/accessToken';
// import { setAccessToken } from 'src/accessToken';
import { useLogoutUserMutation } from 'src/generated/graphql';

interface Props {

}

export const Header: React.FC<Props> = () => {
  const [logout, {client}] = useLogoutUserMutation();
  const isLoggedIn = !!accessToken();
  return (
    <header className='block'>
      <ul className='inline-block float-right'>
        <li className='inline-block'>
          <Link 
            to='/login'
            className='cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 rounded-none hover:border-white'
          >
            Log In
          </Link>
        </li>
        <li className='inline-block'>
          <Link 
            to='/register' 
            className='cursor-pointer align-middle text-center font-bold select-none text-sm m-0 rounded -mt-0.5 border-solid border-white border-2 pt-2 pb-2 px-7.5 whitespace-nowrap leading-tight transition duration-500 ease-in-out hover:bg-white hover:text-black text-white'>
              Sign Up
          </Link>
        </li>
      </ul>
      {/* <div>
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
        <Link to='/user-profile'>User Profile</Link>
      </div> */}
      {isLoggedIn && <div>
        <button
          onClick={async () => {
            await logout();
            await accessToken('');
            await client.resetStore();
          }}
        >Logout</button>
      </div>}
    </header>
  );
}