import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageCrop } from './ImageCrop';

export const Upload = ({setFieldValue, values}) => {
  const [image, setImage] = useState<any>(null);
  const [isImgCropped, setIsImgCropped] = useState<boolean>(true);

  const addFile = useCallback((file) => {
    setFieldValue('imgFiles', values.imgFiles.concat(file));
    setIsImgCropped(true);
  }, [setFieldValue, values]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFile) => {
      console.log(acceptedFile)
      setImage(acceptedFile);
      setIsImgCropped(false);
    },
    accept: 'image/jpeg, image/png'
  });

  return (
    <div>
      {}
      <div {...getRootProps({ className: "dropzone" })}>
        {!isImgCropped &&
          <ImageCrop image={image} open={!isImgCropped} addFile={addFile} />
        }
        <input {...getInputProps()} disabled={!isImgCropped} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  )
};