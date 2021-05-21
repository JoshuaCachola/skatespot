import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useGetUserQuery } from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { Footer } from './components/Footer';
// import * as Yup from 'yup';

interface ProfilePicture {
  profilePicture: Array<File>;
}

// const validationSchema = Yup.object({
//   profilePicture: Yup.
// });

const AutoSubmitProfilePicture = (profilePicture) => {
  const { submitForm } = useFormikContext();
  React.useEffect(() => {
    if (profilePicture.length > 0) {
      submitForm();
    }
  }, [profilePicture, submitForm]);

  return null;
};

export const UpdateProfilePicture: React.FC<RouteComponentProps> = () => {
  const { data } = useGetUserQuery();
  console.log(data);
  // const formik = useFormik({
  //   initialValues: {
  //     profilePicture: null,
  //   },
  //   onSubmit: async (values, { resetForm, setSubmitting }) => {
  //     alert('sent');
  //   },
  // });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {},
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
          <Formik
            initialValues={{ profilePicture: [] }}
            onSubmit={() => {
              alert('hello');
            }}
          >
            {(props: FormikProps<ProfilePicture>) => {
              const { values } = props;
              return (
                <Form>
                  <div
                    {...getRootProps({ className: 'dropzone' })}
                    className="rounded border-2 border-dashed border-gray-500 my-8 py-12"
                  >
                    <div className="text-black font-bold text-3xl text-center w-4/5 my-5 mx-auto">
                      <h3>Drag and drop your photos here</h3>
                      <fieldset className="border-t border-gray-400 my-4">
                        <legend className="font-normal text-base px-4">OR</legend>
                      </fieldset>
                      <div
                        className="text-white font-bold text-base px-4 py-2 rounded bg-red-500 cursor-pointer w-32 mx-auto"
                        onClick={() => console.log('clicked')}
                      >
                        <Field name="profilePicture" type="file" {...getInputProps()} />
                        Browse Files
                      </div>
                    </div>
                  </div>
                  <AutoSubmitProfilePicture values={values.profilePicture} />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};
