import React from 'react';

interface ThumbnailProps {
  img: File;
  idx: number;
  handleRemovePhoto: (event, idx) => void;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ img, idx, handleRemovePhoto }) => {
  return (
    <div className="flex relative">
      <div className="absolute right-0 m-1">
        <button
          className="text-sm border-2 font-bold border-black rounded-full px-2 py-px hover:bg-black hover:bg-opacity-30"
          onClick={(event) => handleRemovePhoto(event, idx)}
        >
          x
        </button>
      </div>
      <div className="flex justify-center align-middle mt-1">
        <img src={URL.createObjectURL(img)} alt={img.name} height={100} width={100} />
      </div>
    </div>
  );
};
