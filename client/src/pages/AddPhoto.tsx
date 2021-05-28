import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useUploadPhotosMutation } from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { UploadPhoto } from 'src/utils/UploadPhoto';
import { Footer } from './components/Footer';
// import * as Yup from 'yup';

interface SkateSpotPhotos {
  photos: Array<File>;
}

interface Props {
  location: any;
}

export const AddPhoto: React.FC<RouteComponentProps & Props> = ({ history, location }) => {
  // const { data } = useGetUserQuery();
  const [upload, { loading, error }] = useUploadPhotosMutation();
  const [photos, setPhotos] = React.useState([]);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <Header />
      {/* Upload */}
      <div className="w-220 mx-auto my-0">
        <div className="mt-4 flex">
          <div
            className="font-bold text-blue-700 text-3xl cursor-pointer border-b-2 border-transparent hover:border-blue-700"
            onClick={() => history.goBack()}
          >
            <h2>{location.state.name}</h2>
          </div>
          <span className="font-semibold text-3xl text-blue-700">:</span>
          <div className="font-extrabold text-black text-3xl">
            <h2>Add Photos</h2>
          </div>
        </div>
        <div>
          <Formik
            initialValues={{ photos: [] }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await upload({ variables: { imgFiles: values.photos, skateSpotId: location.state.id } });
              resetForm();
              setSubmitting(false);
            }}
          >
            {(props: FormikProps<SkateSpotPhotos>) => {
              const { setFieldValue, values } = props;
              return (
                <>
                  <Form>
                    <UploadPhoto photos={photos} setPhotos={setPhotos} setFieldValue={setFieldValue} values={values} />
                    <div className="mt-6 justify-center flex">
                      <button
                        type="submit"
                        className="border rounded border-red-500 bg-red-500 text-white py-2 px-8 text-lg font-semibold"
                      >
                        Upload Photos
                      </button>
                    </div>
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
