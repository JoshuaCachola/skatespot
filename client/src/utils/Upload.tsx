import { useDropzone } from 'react-dropzone';

export const Upload = ({setFieldValue, values}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedValues => {
      setFieldValue('files', values.files.concat(acceptedValues))
    }
  });
  return (
    <div>
      {}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  )
};