import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { TokenContextType } from 'src/types/TokenContext';
import { TokenContext } from 'src/utils/TokenContext';
import { accessToken } from '../../graphql/reactive-variables/accessToken';
import { Account } from './Account';


interface Props {

}

export const Header: React.FC<Props> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const value = useMemo(() => ({isLoggedIn, setIsLoggedIn}), [isLoggedIn, setIsLoggedIn])

  useEffect(() => {
    const token = !!accessToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <header className=''>
      {isLoggedIn ?
        <div className='block'>
          <ul className='inline-block float-left'>
            <li>
              <button>
                Skate Crew
              </button>
            </li>
          </ul>
          <ul className='inline-block float-right'>
            <li>
              <TokenContext.Provider value={value}>
                <Account />
              </TokenContext.Provider>
            </li>
          </ul>
        </div>
      :
        <div className='block'>
          <ul className='inline-block float-right'>
            <li className='inline-block'>
              <Link 
                to='/login'
                className='cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-white'
              >
                Log In
              </Link>
            </li>
            <li className='inline-block'>
              <Link 
                to='/register' 
                className='cursor-pointer align-middle text-center font-bold select-none text-sm rounded -mt-0.5 border-solid border-white border-2 pt-2 pb-2 px-7.5 whitespace-nowrap leading-tight transition duration-500 ease-in-out hover:bg-white hover:text-black text-white'>
                  Sign Up
              </Link>
            </li>
          </ul>
        </div>
      }
    </header>
  );
}