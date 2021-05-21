import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PROFILE_IMAGE } from './constants';
import { ImageCropModal } from './ImageCropModal';
import { Thumbnail } from './Thumbnail';

// interface Props {

// }

export const Upload = ({ setFieldValue, values, type, submitForm }) => {
  const [image, setImage] = useState<any>(null);
  const [isImgCropped, setIsImgCropped] = useState<boolean>(true);

  console.log(image);

  const addFile = useCallback(
    (file) => {
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

  const uploadSkateSpotImage = () => {
    return (
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="flex flex-1 flex-col p-5 rounded border-2 focus:outline-none hover:border-red-500 cursor-pointer"
      >
        {!isImgCropped && <ImageCropModal image={image} open={!isImgCropped} addFile={addFile} />}
        <div className="text-gray-400 text-3xl mx-auto my-5 hovered-difference:text-red-500">
          <span>
            <FontAwesomeIcon icon={['fas', 'images']} />
          </span>
        </div>
        <input {...getInputProps()} disabled={!isImgCropped} />

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
    );
  };

  const uploadProfileImage = () => {
    return (
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="rounded border-2 border-dashed border-gray-500 my-8 py-12"
      >
        <div className="text-black font-bold text-3xl text-center w-4/5 my-5 mx-auto">
          <h3>Drag and drop your photos here</h3>
          <fieldset className="border-t border-gray-400 my-4">
            <legend className="font-normal text-base px-4">OR</legend>
          </fieldset>
          <div className="text-white font-bold text-base px-4 py-2 rounded bg-red-500 cursor-pointer w-32 mx-auto">
            <input {...getInputProps()} />
            Browse Files
          </div>
        </div>
      </div>
    );
  };

  return <>{type === PROFILE_IMAGE ? uploadProfileImage : uploadSkateSpotImage}</>;
};
