import React from 'react';

interface ThumbnailProps {
  file: File,
}

export const Thumbnail: React.FC<ThumbnailProps> = ({file}) => {
  return(
    <img 
      src={URL.createObjectURL(file)}
      alt={file.name}
      className='mt-2'
      height={200}
      width={200}
    />
  );
}