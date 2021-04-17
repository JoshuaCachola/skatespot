import React from 'react';

interface Props {

}

const results = [
  {
    id: 1,
    name: 'Wallenberg High School',
    address: '40 Vega St, San Francisco, CA 94115'
  }
];

export const SkateSpotResults: React.FC<Props> = () => {
  return (
    <div>
      <ul>
        {results && results.map((result) => {
          return (
            <li 
              key={result.id}
              className='flex'
            >
              {/* skate spot img carousel */}
              <div>
                
              </div>
              {/* skatespot information */}
              <div>
                {/* skatespot name/rating and address*/}
                <div className='flex'>
                  <div>

                  </div>
                  <div className='justify-end'>

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