import React from 'react';

interface Props {
  images: Array<string>;
}

export const ReviewImages: React.FC<Props> = ({ images }) => {
  return (
    <div className="flex mb-5">
      {images &&
        images.map((img: string, idx: number) => {
          return (
            <div key={idx} className="max-h-64 w-64 mr-5">
              <img src={img} alt="review" className="rounded" />
            </div>
          );
        })}
    </div>
  );
};
