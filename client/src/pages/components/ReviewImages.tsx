import React, { useState } from 'react';
import { ImageModal } from 'src/utils/ImageModal';

interface Props {
  images: Array<string>;
}

export const ReviewImages: React.FC<Props> = ({ images }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [imagesIdx, setImagesIdx] = useState<number>(0);

  console.log(images);
  const handleImageClick = (idx: number) => {
    if (isOpen) {
      return;
    }

    setIsOpen(true);
    setImagesIdx(idx);
  };

  return (
    <>
      <div className="flex mb-5">
        {images &&
          images.map((img: string, idx: number) => {
            return (
              <div key={idx} onClick={() => handleImageClick(idx)} className="max-h-64 w-64 mr-5 cursor-pointer">
                <img src={img} alt="review" className="rounded border border-black" />
              </div>
            );
          })}
      </div>
      {isOpen && <ImageModal idx={imagesIdx} setIdx={setImagesIdx} images={images} setIsOpen={setIsOpen} />}
    </>
  );
};
