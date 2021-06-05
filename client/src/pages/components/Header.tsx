import React from 'react';
import { Link } from 'react-router-dom';
import { TokenContext } from 'src/utils/TokenContext';
import DropDownMenu from './DropDownMenu';
import SearchForm from './SearchForm';
import BoardTap from '../../assets/board-tap.png';
import { useMediaQuery } from 'react-responsive';
import { Logo } from './Logo';
import { HEADER } from '../../utils/constants';

export const Header: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 937px)' });
  const { isLoggedIn } = React.useContext(TokenContext);

  return (
    <header className="bg-gray-500 border-b-2 border-r-4 border-l border-black shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-around">
        <div className="mx-6 font-semibold p-2 hover:border hover:bg-black hover:bg-opacity-10 rounded">
          <Link to="/">
            <div className="flex items-center">
              {/* <div className="flex border-2 border-black px-1 rounded bg-white">
                <span className="font-bold text-lg">S</span>
                <span className="font-thin text-lg">S</span> 
  </div> */}

              <Logo type={HEADER} />
              {!isTabletOrMobile && (
                <div className="text-white">
                  <span className="font-bold text-lg">&nbsp;Skate</span>
                  <span className="font-light text-lg">Spot</span>
                </div>
              )}
            </div>
          </Link>
        </div>
        {/* Search Form */}
        <div className={`${!isTabletOrMobile && 'ml-10'}`}>
          <SearchForm />
        </div>
        {/* Nav Links*/}
        {isLoggedIn ? (
          <div className="mr-4">
            <nav>
              <ul className="flex items-center">
                {!isMobile && (
                  <li className="mr-5">
                    <div className="font-semibold p-2 hover:border hover:bg-black hover:bg-opacity-10 rounded">
                      <Link to="/create-skate-spot">
                        <div className="flex items-center">
                          <div className="border-r-4 border-b-4 border-t border-l border-black rounded p-2 bg-white">
                            <img src={BoardTap} alt="" className="w-5 h-5" />
                          </div>
                          <div className="text-white text-lg">
                            &nbsp;Create <span className="font-light">Skate Spot</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </li>
                )}
                <li>
                  <DropDownMenu type={HEADER} />
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          // <div className="block mr-4 mb-1">
          //   <nav>
          //     <ul className="flex items-center">
          //       <li className="">
          //         <Link
          //           to="/login"
          //           className="cursor-pointer text-black block font-bold leading-tight pt-3 px-3.5 pb-2 border-b-2 border-transparent mr-4 hover:border-black"
          //         >
          //           Log In
          //         </Link>
          //       </li>
          //       <li className="">
          //         <Link
          //           to="/register"
          //           className="cursor-pointer align-middle text-center font-bold select-none text-sm rounded border-solid border-black border-2 pt-2 pb-2 px-7.5 whitespace-nowrap leading-tight transition duration-500 ease-in-out hover:bg-black hover:bg-opacity-10 hover:text-black text-black"
          //         >
          //           Sign Up
          //         </Link>
          //       </li>
          //     </ul>
          //   </nav>
          // </div>
          <DropDownMenu type={HEADER} />
        )}
      </div>
    </header>
  );
};
