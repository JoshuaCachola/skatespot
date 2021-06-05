import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from 'src/utils/constants';
import { TokenContext } from 'src/utils/TokenContext';
import DropDownMenu from '../components/DropDownMenu';

export const HomepageHeader: React.FC = () => {
  const { isLoggedIn } = React.useContext(TokenContext);

  return (
    <header>
      {isLoggedIn ? (
        <div className="block">
          <nav>
            <ul className="flex float-left">
              <li className="cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-white">
                <Link to="/create-skate-spot">
                  <span>Create Skate Spot</span>
                </Link>
              </li>
            </ul>
            <ul className="inline-block float-right">
              <li>
                <DropDownMenu type={HOME} />
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="block">
          <nav>
            <ul className="inline-block float-right">
              <li className="inline-block">
                <Link
                  to="/login"
                  className="cursor-pointer text-white block font-bold leading-tight pt-2 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-white"
                >
                  Log In
                </Link>
              </li>
              <li className="inline-block">
                <Link
                  to="/register"
                  className="cursor-pointer align-middle text-center font-bold select-none text-sm rounded -mt-0.5 border-solid border-white  border-2 pt-2 pb-2 px-7.5 whitespace-nowrap leading-tight transition duration-500 ease-in-out hover:bg-white hover:text-black text-white"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
