import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import { Thumbnail } from './Thumbnail';

export const Upload = ({ setFieldValue, values }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {
      setFieldValue('imgFiles', values.imgFiles.concat(acceptedFile));
    },
    accept: 'image/jpeg, image/png',
  });

  const handleRemovePhoto = (event, idx) => {
    event.preventDefault();
    event.stopPropagation();
    setFieldValue(
      'imgFiles',
      values.imgFiles.filter((_, i) => i !== idx),
    );
  };

  console.log(values);
  return (
    <>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="flex flex-1 flex-col p-5 rounded border-2 focus:outline-none hover:border-red-500 cursor-pointer"
      >
        <div className="text-gray-400 text-3xl mx-auto my-5 hovered-difference:text-red-500">
          <FontAwesomeIcon icon={['fas', 'images']} />
        </div>
        <input {...getInputProps()} />

        <div className="flex flex-wrap">
          {values.imgFiles &&
            values.imgFiles.map((img: File, idx: number) => {
              return (
                <div key={idx} className="mx-3">
                  <Thumbnail img={img} idx={idx} handleRemovePhoto={handleRemovePhoto} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
