import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GetSkateSpotDocument, useUploadPhotosMutation } from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { UploadPhoto } from 'src/utils/UploadPhoto';
import { ErrorBanner } from './components/ErrorBanner';
import { Footer } from './components/Footer';
import { LoadingAnimation } from './components/LoadingAnimation';
// import * as Yup from 'yup';

interface SkateSpotPhotos {
  photos: Array<File>;
}

interface Props {
  location: any;
}

export const AddPhoto: React.FC<RouteComponentProps & Props> = ({ history, location }) => {
  const [upload, { loading, error, client }] = useUploadPhotosMutation({
    onCompleted({ uploadPhotos }) {
      client.writeQuery({
        query: GetSkateSpotDocument,
        data: {
          getSkateSpot: { ...location.state.skatespot, imageUrls: uploadPhotos.imageUrls },
        },
        variables: { name: location.state.skatespot.name },
      });
    },
  });

  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    return () => {
      setPhotos([]);
    };
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto">
            <LoadingAnimation />
          </div>
        </div>
      )}
      <Header />
      {error && <ErrorBanner />}
      {/* Upload */}
      <div className="w-220 mx-auto my-0">
        <div className="mt-4 flex">
          <div
            className="font-bold text-blue-700 text-3xl cursor-pointer border-b-2 border-transparent hover:border-blue-700"
            onClick={() => history.push(`/skate-spot/${location.state.skatespot.name}`)}
          >
            <h2>{location.state.skatespot.name}</h2>
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
              await upload({ variables: { imgFiles: values.photos, skateSpotId: location.state.skatespot.id } });
              resetForm();
              setSubmitting(false);
              history.push(`/skate-spot/${location.state.skatespot.name}`);
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
                        className="rounded text-white py-2 px-8 text-lg font-semibold border-blue-400 bg-blue-400 border-r-2 border-b-2 border-l border-t hover:bg-blue-200 hover:text-black"
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
      <div className="absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
};
