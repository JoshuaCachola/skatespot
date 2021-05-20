import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { Footer } from './components/Footer';
// import * as Yup from 'yup';

interface Props {}

// const validationSchema = Yup.object({
//   profilePicture: Yup.
// });

// const AutoSubmitProfilePicture = () => {
//   const { values, submitForm } = useFormikContext();
//   React.useEffect(() => {
//     if (values.profilePicture) {
//       submitForm();
//     }
//   }, [values, submitForm]);

//   return null;
// };

export const UpdateProfilePicture: React.FC<Props> = () => {
  const { data } = useGetUserQuery();
  console.log(data);
  const formik = useFormik({
    initialValues: {
      profilePicture: null,
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      alert('sent');
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {
      formik.setFieldValue('profilePicture', acceptedFile);
    },
  });

  return (
    <div>
      <Header />
      {/* Upload */}
      <div className="w-220 mx-auto my-0">
        <div className="flex text-center mt-4">
          <Link to="/user-profile" className="text-blue-700 font-bold">
            <h3>
              {data?.getUser.firstName} <span>{data?.getUser.lastName[0]}.</span>
            </h3>
          </Link>
          <div className="font-normal text-gray-500">
            <span>
              &nbsp;
              <FontAwesomeIcon icon={['fas', 'angle-double-right']} />
              &nbsp;
            </span>
          </div>
          <div className="font-extralight">Profile Pictures</div>
        </div>
        <div className="font-bold text-xl text-red-500 border-b border-gray-200 cursor-pointer">
          <h2 className="mb-4">Add Photos</h2>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
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
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
