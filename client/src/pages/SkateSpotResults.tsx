import React from 'react';
import { Header } from './components/Header';
import SearchResults1 from '../assets/SearchResults1.jpg';

interface Props {

}

const results = [
  {
    id: 1,
    name: 'Wallenberg High School',
    address: '40 Vega St, San Francisco, CA 94115'
  },
  {
    id: 2,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 3,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 4,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 5,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 6,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 7,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 8,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 9,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  },
  {
    id: 10,
    name: 'Milpitas Skate Park',
    address: '111 Milpitas Ave, Milpitas, CA 95132'
  }
];

export const SkateSpotResults: React.FC<Props> = () => {
  return (
    <div>
      <Header />
      <ul className='mt-4'>
        {results && results.map((result) => {
          return (
            <li 
              key={result.id}
              className='flex rounded border-2 mb-7 border-gray-100'
            >
              {/* skate spot img carousel */}
              <div className='m-8'>
                <img
                  src={SearchResults1}
                  alt='search'
                />
              </div>
              {/* skatespot information */}
              <div className='w-full mt-8'>
                {/* skatespot name/rating and address*/}
                <div className='flex justify-between'>
                  {/* name and rating */}
                  <div className=''>
                    <h1 className='text-xl font-bold'>{result.name}</h1>
                  </div>
                  <div className=''>
                    <address>
                      <p>
                        <span>
                          {result.address}
                        </span>
                      </p>
                    </address>
                  </div>
                </div>
                {/* what is there to skate, skating conditions etc... */}
                <div>

                </div>
              </div>
            </li>
          )
        })
        }
      </ul>
      {/* map of locations */}
      <div>

      </div>
    </div>
  );
}