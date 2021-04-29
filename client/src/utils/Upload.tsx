import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageCropModal } from './ImageCropModal';
import { Thumbnail } from './Thumbnail';

export const Upload = ({ setFieldValue, values }) => {
  const [image, setImage] = useState<any>(null);
  const [isImgCropped, setIsImgCropped] = useState<boolean>(true);

  const addFile = useCallback(
    (file) => {
      console.log(file);
      setFieldValue('imgFiles', values.imgFiles.concat(file));
      setIsImgCropped(true);
    },
    [setFieldValue, values],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {
      setImage(acceptedFile[0]);
      setIsImgCropped(false);
    },
    accept: 'image/jpeg, image/png',
  });

  return (
    <div>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="flex flex-1 flex-col p-5 rounded border-2 focus:outline-none hover:border-red-500 cursor-pointer"
      >
        {!isImgCropped && <ImageCropModal image={image} open={!isImgCropped} addFile={addFile} />}
        <input {...getInputProps()} disabled={!isImgCropped} />
        <div className="text-gray-400 text-3xl mx-auto my-5">
          <span>
            <FontAwesomeIcon icon={['fas', 'images']} />
          </span>
        </div>
        <div className="flex flex-wrap">
          {values.imgFiles &&
            values.imgFiles.map((img: File, idx) => {
              return (
                <div key={idx} className="mx-3">
                  <Thumbnail img={img} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
