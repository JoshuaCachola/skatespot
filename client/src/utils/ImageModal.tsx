import React from 'react';

interface Props {
  image: string
}

export const ImageModal: React.FC<Props> = ({image}) => {
  return(
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70'>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-12 bg-gray-50'>
        <div className='flex h-3/4'>
          {/* Image */}
          <div>
            <img 
              src={image}
              alt='img-modal'
            />
          </div>
          {/* Comments */}
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}