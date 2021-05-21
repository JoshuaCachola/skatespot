import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
// import { useDropzone } from 'react-dropzone';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useGetUserQuery } from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { Upload } from 'src/utils/Upload';
import { Footer } from './components/Footer';
// import * as Yup from 'yup';

interface ProfilePicture {
  profilePicture: Array<File>;
}

// const AutoSubmitProfilePicture = (profilePicture) => {
//   React.useEffect(() => {
//     if (profilePicture.length > 0) {
//       console.log(profilePicture);
//     }
//   }, [profilePicture]);

//   return null;
// };
// const validationSchema = Yup.object({
//   profilePicture: Yup.
// });

export const UpdateProfilePicture: React.FC<RouteComponentProps> = () => {
  const { data } = useGetUserQuery();
  // const { values, setFieldValue } = useFormikContext();

  // React.useEffect(() => {
  //   if (values.profilePicture.length > 0) {

  //   }
  // }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     profilePicture: [],
  //   },
  //   onSubmit: async (values, { resetForm, setSubmitting }) => {
  //     alert('sent');
  //   },
  // });

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFile) => {
  //     // setFieldValue('profilePicture', values.profilePicture.concat(acceptedFile));
  //   },
  // });

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
          <Formik initialValues={{ profilePicture: [] }} onSubmit={() => alert('hello')}>
            {(props: FormikProps<ProfilePicture>) => {
              const { values, submitForm, setFieldValue } = props;
              return (
                <>
                  <Form>
                    <Upload values={values} setFieldValue={setFieldValue} type={'PROFILE'} submitForm={submitForm} />
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};
