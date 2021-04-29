import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import ReactCrop from 'react-image-crop';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  image: File;
  open: boolean;
  addFile: (file: Array<File>) => void;
}

const modal = document.getElementById('modal') as HTMLElement;

export const ImageCropModal: React.FC<Props> = ({ image, open, addFile }) => {
  const [img, setImg] = useState<any>(null);

  // change crop to use reducer to change aspect ratio
  const [crop, setCrop] = useState<any>({ unit: '%', width: 1080, aspect: 1 / 1 });
  const [completedCrop, setCompleteCrop] = useState<any>(null);

  const previewCanvasRef = useRef<any>(null);
  const imgRef = useRef<any>(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const generateBlob = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        let file = new File([blob], `${uuidv4().toString()}.png`, { type: 'image/png' });
        addFile([file]);
      },
      'image/png',
      1,
    );
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setImg(reader.result));
    reader.readAsDataURL(image);
  }, [image]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-50 p-12">
          <ReactCrop
            src={img}
            crop={crop}
            onImageLoaded={onLoad}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompleteCrop(c)}
          />
          <div>
            <h2 className="text-center font-semibold my-5">Preview</h2>
            <canvas
              className="block mx-auto"
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
          <div className="flex justify-around align-middle mt-5">
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => generateBlob(previewCanvasRef.current, completedCrop)}
            >
              Add File
            </button>
            <button type="button" className="focus:outline-none" onClick={() => addFile([])}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    modal,
  );
};
