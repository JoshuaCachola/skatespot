import React, { useState } from 'react';
import { useFormik } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';


const SearchForm: React.FC<RouteComponentProps> = ({history}) => {
  const [isFindSearchOpen, setIsFindSearchOpen] = useState<boolean>(false);
  const [isNearSearchOpen, setIsNearSearchOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      find: '',
      near: ''
    },
    onSubmit: values => {
      history.push('/search');
    }
  });
  return(
    <form onSubmit={formik.handleSubmit} className='mb-0 align-baseline block'>
      <div className='flex min-w-full table-auto'>
        {/* find input */}
        <div className='flex-1 block box-border'>
          <div className='table min-h-0 min-w-full table-auto'>
            <div className='table-cell box-border align-top'>
              <div className='min-w-full box-border align-top block'>
                <div className='shadow-lg mt-4'>
                  <label
                    search-divider=''
                    className={`after:content relative rounded-l rounded-r-none px-3 py-3 text-lg font-bold bg-white box-border block w-full mt-0 mb-5 mx-0 ${isFindSearchOpen && 'rounded-b'}`}
                  >
                    <div className='flex'>
                      <span className='mr-3 text-gray-600'>Find</span>
                      <span className='block flex-grow'>
                        <input
                          type='text'
                          autoComplete='off'
                          placeholder='skaters, skate spots, skate crews'
                          maxLength={64}
                          className='cursor-text inline-block w-full box-border focus:outline-none'
                          onClick={() => setIsFindSearchOpen(!isFindSearchOpen)}
                        />
                      </span>
                    </div>
                    {isFindSearchOpen &&
                      <div className='rounded-b bg-white mt-4'>
                        <ul>
                          <li>
                            skaters
                          </li>
                          <li>
                            skate spots
                          </li>
                          <li>
                            skate crews
                          </li>
                        </ul>
                      </div>
                    }
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* near input */}
        <div className='flex-1 block box-border'>
          <div className='table min-w-full table-auto'>
            <div className='table-cell box-border align-top'>
              <div className='block min-w-full box-border align-top'>
                <div className='shadow-lg mt-4'>
                  <label className={`rounded-l-none rounded-r-none px-3 py-3 text-lg font-bold bg-white box-border block w-full mt-0 mb-5 mx-0 ${isNearSearchOpen && 'rounded-b'}`}>
                    <div className='flex'>
                      <span className='mr-3 text-gray-600'>Near</span>
                      <span className='block flex-grow'>
                        <input
                          type='text'
                          autoComplete='off'
                          placeholder='San Jose, CA'
                          maxLength={64}
                          className='cursor-text inline-block w-full box-border focus:outline-none'
                          onClick={() => setIsNearSearchOpen(!isNearSearchOpen)}
                        />
                      </span>
                    </div>
                    {isNearSearchOpen &&
                      <div className='rounded-b bg-white mt-4'>
                        <ul>
                          <li>
                            Current Location
                          </li>
                          <li>
                            San Jose
                          </li>
                        </ul>
                      </div>
                    }
                  </label>
                </div>
              </div>
            </div>
            {/* search button */}
            <div className='box-border table-cell align-top'>
              <button
                type='submit'
                className='shadow-lg mt-4 rounded-l-none rounded-r bg-red-500 px-5 py-3.75 leading-normal focus:outline-none'
              >
              <span>
                <span className='w-6 h-6 text-white font-semibold'>Search</span>
              </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withRouter(SearchForm);