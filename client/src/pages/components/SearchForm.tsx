import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchLazyQuery } from 'src/generated/graphql';
import ClickAwayListener from 'react-click-away-listener';

const SearchForm: React.FC<RouteComponentProps> = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: () => {
      history.push({
        pathname: '/search',
        search: `query=${formik.values.query}`,
        state: { skatespots: data?.search },
      });
    },
  });

  const [search, { loading, data }] = useSearchLazyQuery({ pollInterval: 500 });
  const [isFindSearchOpen, setIsFindSearchOpen] = useState<boolean>(false);

  React.useEffect(() => {
    search({ variables: { query: formik.values.query } });
  }, [formik.values.query, search]);

  useEffect(() => {
    return () => {
      setIsFindSearchOpen(false);
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="align-baseline block relative ml-7">
      <div className="flex min-w-full">
        {/* find input */}
        <div className="flex-1 block box-border">
          <div className="table min-h-0 min-w-full">
            <div className="table-cell box-border align-top">
              <div className="min-w-full box-border align-top block">
                <div className="shadow-lg mt-4">
                  <label
                    className={`relative rounded-l rounded-r-none px-3 py-3 text-lg font-bold bg-white block w-full mt-0 mb-5 mx-0 border-l border-t border-b-4 shadow-2xl border-black ${
                      isFindSearchOpen ? 'rounded-bl-none' : 'rounded-br-none'
                    }`}
                  >
                    <div className="flex">
                      <span className="mr-3 text-gray-600">Find</span>
                      <span className="block flex-grow">
                        <input
                          id="query"
                          name="query"
                          type="text"
                          autoComplete="off"
                          placeholder="Try searching skate..."
                          maxLength={64}
                          className="cursor-text inline-block w-full focus:outline-none"
                          onClick={() => setIsFindSearchOpen(true)}
                          onChange={formik.handleChange}
                        />
                      </span>
                    </div>
                    {isFindSearchOpen && (
                      <ClickAwayListener onClickAway={() => setIsFindSearchOpen(false)}>
                        <div className="absolute w-full inline-block rounded-b box-border shadow-lg mt-3 right-px bg-white border-t z-50 border-l border-b-4 border-r-4 border-black">
                          {!loading && data?.search.length !== 0 ? (
                            data?.search.map((result) => {
                              return (
                                <ul className="m-4 relative z-50" key={result.id}>
                                  <li>
                                    <Link
                                      to={{
                                        pathname: `/skate-spot/${result.name}`,
                                        state: { skateSpot: result },
                                      }}
                                    >
                                      <div className="flex">
                                        <div className="flex justify-center align-middle overflow-hidden mr-2">
                                          <img src={JSON.parse(result.imageUrls)[0]} alt="" className="h-12 w-12" />
                                        </div>
                                        <div className="text-sm font-light">
                                          <p className="font-bold">
                                            {result.name.length > 50 ? result.name.slice(0, 40) : result.name}
                                          </p>
                                          <p>{result.categoryName}</p>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              );
                            })
                          ) : (
                            <ul className="m-4 relative z-50 font-light">
                              <li>skate spots</li>
                            </ul>
                          )}
                        </div>
                      </ClickAwayListener>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* search button */}
        <div className="box-border table-cell align-top">
          <button
            type="submit"
            className="shadow-lg mt-4 rounded-l-none rounded-r bg-blue-400 px-5 py-3.75 leading-normal focus:outline-none text-white hover:bg-blue-200 hover:text-black border-r-4 border-b-4 border-l border-t border-black"
          >
            <span className="w-6 h-6 text-base">
              <FontAwesomeIcon icon={['fas', 'search']} />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default withRouter(SearchForm);
