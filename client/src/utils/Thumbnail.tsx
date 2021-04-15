import React from 'react';

interface ThumbnailProps {
  img: File,
}

export const Thumbnail: React.FC<ThumbnailProps> = ({img}) => {
  return(
    <img 
      src={URL.createObjectURL(img)}
      alt={img.name}
      className='mt-2'
      height={200}
      width={200}
    />
  );
}