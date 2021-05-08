import React, { useState } from 'react';
import { useFormik } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchLazyQuery } from 'src/generated/graphql';
import ClickAwayListener from 'react-click-away-listener';
import { searchResults } from 'src/graphql/reactive-variables/searchResults';

const SearchForm: React.FC<RouteComponentProps> = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      find: '',
      near: '',
    },
    onSubmit: () => {
      searchResults(data?.search);
      history.push(`/search?find=${formik.values.find}&near=${formik.values.near}`);
    },
  });

  const [search, { loading, data }] = useSearchLazyQuery({ pollInterval: 500 });
  const [isFindSearchOpen, setIsFindSearchOpen] = useState<boolean>(false);
  const [isNearSearchOpen, setIsNearSearchOpen] = useState<boolean>(false);

  React.useEffect(() => {
    search({ variables: { query: formik.values.find } });
  }, [formik.values.find, search]);

  return (
    <form onSubmit={formik.handleSubmit} className="align-baseline block relative">
      <div className="flex min-w-full">
        {/* find input */}
        <div className="flex-1 block box-border">
          <div className="table min-h-0 min-w-full">
            <div className="table-cell box-border align-top">
              <div className="min-w-full box-border align-top block">
                <div className="shadow-lg mt-4">
                  <label
                    search-divider=""
                    className={`after:content relative rounded-l rounded-r-none px-3 py-3 text-lg font-bold bg-white box-border block w-full mt-0 mb-5 mx-0 ${
                      isFindSearchOpen ? 'rounded-bl-none' : 'rounded-br-none after:content'
                    }`}
                  >
                    <div className="flex">
                      <span className="mr-3 text-gray-600">Find</span>
                      <span className="block flex-grow">
                        <input
                          id="find"
                          name="find"
                          type="text"
                          autoComplete="off"
                          placeholder="skaters, skate spots, skate crews"
                          maxLength={64}
                          className="cursor-text inline-block w-full box-border focus:outline-none"
                          onClick={() => setIsFindSearchOpen(!isFindSearchOpen)}
                          onChange={formik.handleChange}
                        />
                      </span>
                    </div>
                    {isFindSearchOpen && (
                      <ClickAwayListener onClickAway={() => setIsFindSearchOpen(!isFindSearchOpen)}>
                        <div className="absolute w-full inline-block rounded-b box-border shadow-lg mt-3 right-px bg-white border-t z-50">
                          {!loading && data?.search.length !== 0 ? (
                            data?.search.map((result) => {
                              return (
                                <ul className="m-4 relative z-50" key={result.id}>
                                  <li>
                                    <p>{result.name}</p>
                                  </li>
                                </ul>
                              );
                            })
                          ) : (
                            <ul className="m-4 relative z-50">
                              <li>skaters</li>
                              <li>skatespots</li>
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
        {/* near input */}
        <div className="flex-1 block box-border">
          <div className="table min-w-full table-auto">
            <div className="table-cell box-border align-top">
              <div className="block min-w-full box-border align-top">
                <div className="shadow-lg mt-4">
                  <label
                    className={`rounded-l-none relative rounded-r-none px-3 py-3 text-lg font-bold bg-white box-border block w-full mt-0 mb-5 mx-0 ${
                      isNearSearchOpen ? 'rounded-b-none' : 'rounded-b-none'
                    }`}
                  >
                    <div className="flex">
                      <span className="mr-3 text-gray-600">Near</span>
                      <span className="block flex-grow">
                        <input
                          name="near"
                          id="near"
                          type="text"
                          autoComplete="off"
                          placeholder="San Jose, CA"
                          maxLength={64}
                          className="cursor-text inline-block w-full box-border focus:outline-none"
                          onClick={() => {
                            setIsNearSearchOpen(!isNearSearchOpen);
                          }}
                          onChange={formik.handleChange}
                        />
                      </span>
                    </div>
                    {isNearSearchOpen && (
                      <div className="absolute rounded-b rounded-t-none w-full left-px bg-white mt-3 shadow-lg border-t z-50">
                        <ul className="m-4">
                          <li>Current Location</li>
                          <li>San Jose</li>
                        </ul>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
            {/* search button */}
            <div className="box-border table-cell align-top">
              <button
                type="submit"
                className="shadow-lg mt-4 rounded-l-none rounded-r bg-red-500 px-5 py-3.75 leading-normal focus:outline-none"
              >
                <span>
                  <span className="w-6 h-6 text-white text-base">
                    <FontAwesomeIcon icon={['fas', 'search']} />
                  </span>
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
