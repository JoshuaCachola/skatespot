import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
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
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });
  const [upload, { loading, error, client }] = useUploadPhotosMutation({
    onCompleted({ uploadPhotos }) {
      client.writeQuery({
        query: GetSkateSpotDocument,
        data: {
          getSkateSpot: { ...location.state.skateSpot.skatespot, imageUrls: uploadPhotos.imageUrls },
        },
        variables: { name: location.state.skateSpot.name },
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
      {error && <ErrorBanner message="Error uploading images..." />}
      {/* Upload */}
      <section className={`h-screen mx-auto my-10 ${isMobile ? 'w-72' : 'w-200'}`}>
        <div className="mt-4">
          <div className="flex text-center">
            <h2
              className={`font-bold text-blue-700 cursor-pointer border-b-2 border-transparent hover:border-blue-700 ${
                isMobile ? 'text-2xl w-72' : 'text-3xl '
              }`}
              onClick={() => history.push(`/skate-spot/${location.state.skateSpot.name}`)}
            >
              {location.state.skateSpot.name}
            </h2>
            <div className={`${isMobile ? 'text-2xl w-72' : 'text-3xl '}`}>
              <span className="font-extrabold text-black">
                <span className="font-semibold text-blue-700">:</span>Add Photos
              </span>
            </div>
          </div>
        </div>
        <div>
          <Formik
            initialValues={{ photos: [] }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await upload({
                variables: { imgFiles: values.photos, skateSpotId: location.state.skateSpot.id },
              });
              resetForm();
              setSubmitting(false);
              if (!error && !loading) {
                history.push(`/skate-spot/${location.state.skateSpot.name}`);
              }
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
                        className="rounded text-white py-2 px-8 text-lg font-semibold border-blue-400 bg-blue-400 border-r-4 border-b-4 border-l border-t hover:bg-blue-200 hover:text-black focus:outline-none"
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
      </section>
      <Footer />
    </div>
  );
};
