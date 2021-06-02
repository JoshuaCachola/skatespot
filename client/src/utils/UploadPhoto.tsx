import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Thumbnail } from './Thumbnail';

export const UploadPhoto = ({ photos, setPhotos, setFieldValue, values }) => {
  React.useEffect(() => {
    if (values.photos.length > 0) {
      setPhotos(values.photos);
    }
  }, [values, setPhotos]);

  const handleRemovePhoto = (event, idx) => {
    event.preventDefault();
    event.stopPropagation();
    const filteredPhotos = values.photos.filter((_, i) => i !== idx);
    setFieldValue('photos', filteredPhotos);
    setPhotos(filteredPhotos);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {
      setFieldValue('photos', values.photos.concat(acceptedFile));
    },
    accept: 'image/jpeg, image/png',
  });
  return (
    <>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="rounded border-2 border-dashed border-gray-500 my-8 py-12"
      >
        <div className="text-black font-bold text-3xl text-center w-4/5 my-5 mx-auto">
          <h3>Drag and drop your photos here</h3>
          <fieldset className="border-t border-gray-400 my-4">
            <legend className="font-normal text-base px-4">OR</legend>
          </fieldset>
          <div className="text-white font-bold text-base px-4 py-2 rounded bg-red-500 cursor-pointer w-32 mx-auto hover:bg-red-400 hover:text-black">
            <input {...getInputProps()} />
            Browse Files
          </div>
          <div className="flex flex-wrap">
            {photos &&
              photos.map((img: File, idx: number) => {
                return (
                  <div key={idx} className="mx-3">
                    <Thumbnail img={img} idx={idx} handleRemovePhoto={handleRemovePhoto} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
