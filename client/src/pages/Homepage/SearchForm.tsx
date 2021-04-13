import React from 'react';
import { useFormik } from 'formik';

interface Props {

}

export const SearchForm: React.FC<Props> = () => {
  const formik = useFormik({
    initialValues: {
      find: '',
      near: ''
    },
    onSubmit: values => {
      alert('hello');
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
                <div>
                  <label
                    search-divider=''
                    className='after:content relative rounded-l rounded-r-none px-3 py-3 text-lg font-bold bg-white box-border block w-full mt-0 mb-5 mx-0'
                  >
                    <div className='flex'>
                      <span className='mr-3 text-gray-600'>Find</span>
                      <span className='block flex-grow'>
                        <input
                          type='text'
                          autoComplete='off'
                          maxLength={64}
                          className='cursor-text inline-block w-full box-border focus:outline-none'
                        />
                      </span>
                    </div>
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
                <div>
                  <label className='rounded-l-none rounded-r-none px-3 py-3 text-lg font-bold bg-white box-border block w-full mt-0 mb-5 mx-0'>
                    <div className='flex'>
                      <span className='mr-3 text-gray-600'>Near</span>
                      <span className='block flex-grow'>
                        <input
                          type='text'
                          autoComplete='off'
                          maxLength={64}
                          className='cursor-text inline-block w-full box-border focus:outline-none'
                        />
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* search button */}
            <div className='box-border table-cell align-top'>
              <button
                className='rounded-l-none rounded-r bg-red-500 px-5 py-3.75 leading-normal'
              >
              <span>
                <span className='w-6 h-6'>Search</span>
              </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}