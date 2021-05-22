import React from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadProfilePicture = ({ setProfilePicture, setFieldValue, values }) => {
  // const onDrop = useCallback(
  //   (file) => {
  //     setFieldValue('profilePicture', file);
  //     update({ variables: values });
  //   },
  //   [setFieldValue, values],
  // );

  React.useEffect(() => {
    if (values.profilePicture.length > 0) {
      setProfilePicture(values.profilePicture);
    }
  }, [values, setProfilePicture]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {
      setFieldValue('profilePicture', values.profilePicture.concat(acceptedFile));
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
          <div className="text-white font-bold text-base px-4 py-2 rounded bg-red-500 cursor-pointer w-32 mx-auto">
            <input {...getInputProps()} />
            Browse Files
          </div>
        </div>
      </div>
    </>
  );
};
