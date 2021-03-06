import React, { useCallback, useState } from 'react';
import ReactDom from 'react-dom';
import ClickAwayListener from 'react-click-away-listener';
import { useMediaQuery } from 'react-responsive';

interface Props {
  images: Array<string>;
  setIsOpen: (isOpen: boolean) => void;
  idx: number;
  setIdx: (idx: number) => void;
}

const modal = document.getElementById('modal') as HTMLElement;

export const ImageModal: React.FC<Props> = ({ images, setIsOpen, idx, setIdx }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });

  const handleClickAway = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const [currentImage, setCurrentImage] = useState<string>(images[idx]);

  const handleChangeImage = (buttonType) => {
    if (buttonType === 'LEFT' && idx > 0) {
      setIdx(idx - 1);
      setCurrentImage(images[idx - 1]);
    } else if (buttonType === 'RIGHT' && idx < images.length - 1) {
      setIdx(idx + 1);
      setCurrentImage(images[idx + 1]);
    }
  };

  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-50">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-black ${
            isMobile && 'w-full h-auto'
          }`}
        >
          <div className="flex">
            {/* Image */}
            <div className={`bg-black ${isMobile ? 'w-full h-auto' : 'w-140 h-200'}`}>
              <div className="relative top-1/2 transform -translate-y-1/2">
                <img src={currentImage} alt="img-modal" className="h-auto w-full" />
              </div>
            </div>
          </div>
          <div className="absolute text-white font-bold top-1/2 left-1.5 border rounded border-white p-1">
            <button onClick={() => handleChangeImage('PREV')}>Left</button>
          </div>
          <div className="absolute text-white font-bold top-1/2 right-1.5 border rounded border-white p-1">
            <button onClick={() => handleChangeImage('NEXT')}>Right</button>
          </div>
          <div className="absolute text-white right-1">
            <h4>
              Image {idx + 1} of {images.length}
            </h4>
          </div>
        </div>
      </ClickAwayListener>
    </div>,
    modal,
  );
};
