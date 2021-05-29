import React from 'react';

interface ThumbnailProps {
  img: File;
  idx: number;
  handleRemovePhoto: (event, idx) => void;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ img, idx, handleRemovePhoto }) => {
  return (
    <div className="flex">
      <div className="absolute">
        <button
          className="text-sm border-2 font-bold border-black rounded-full px-2 py-px hover:bg-black hover:bg-opacity-30"
          onClick={(event) => handleRemovePhoto(event, idx)}
        >
          x
        </button>
      </div>
      <div className="flex justify-center align-middle">
        <img src={URL.createObjectURL(img)} alt={img.name} className="" height={100} width={100} />
      </div>
    </div>
  );
};
