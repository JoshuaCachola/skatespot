import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';

interface Props {
  image: File,
  open: boolean,
  addFile: (file) => void
}

export const ImageCrop: React.FC<Props> = ({image, open, addFile}) => {
  const [img, setImg] = useState<any>(null);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 1080, aspect: 1 / 1});
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

    canvas.toBlob((blob) => {
      let file = new File([blob], 'example.png', {type: 'image/png'})
      addFile([file]);
    }, 'image/jpeg', 1)
  }

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setImg(reader.result));
    reader.readAsDataURL(image[0]);
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
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  if (!open) {
    return null;
  }

  return(
    <div
      className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-yellow-400 p-12'
    >
      <ReactCrop
        src={img}
        crop={crop}
        onImageLoaded={onLoad}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompleteCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>
      <button
        type='button'
        onClick={() => generateBlob(previewCanvasRef.current, completedCrop)}
      >
        Add File
      </button>
    </div>
  );
}