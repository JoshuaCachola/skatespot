import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  GetUserQuery,
  GetUsersDocument,
  useGetUserQuery,
  useUpdateProfilePictureMutation,
} from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { UploadPhoto } from 'src/utils/UploadPhoto';
import { ErrorBanner } from './components/ErrorBanner';
import { Footer } from './components/Footer';
import { LoadingAnimation } from './components/LoadingAnimation';
// import * as Yup from 'yup';

interface ProfilePicture {
  photos: Array<File>;
}

export const UpdateProfilePicture: React.FC<RouteComponentProps> = ({ history }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });
  const { data } = useGetUserQuery();
  const [photos, setPhotos] = React.useState([]);
  const [updatePhoto, { loading, error }] = useUpdateProfilePictureMutation();

  React.useEffect(() => {
    if (photos.length > 0) {
      updatePhoto({
        variables: { profilePicture: photos },
        update: (client, { data }) => {
          if (!data) {
            return null;
          }

          return client.writeQuery<GetUserQuery>({
            query: GetUsersDocument,
            data: {
              getUser: { ...data.updateProfilePicture, __typename: 'User' },
            },
          });
        },
      });

      setTimeout(() => history.push('/user-profile'), 1000);
    }
  }, [data, photos, updatePhoto, history]);

  useEffect(() => {
    return () => {
      setPhotos([]);
    };
  }, []);

  if (error) {
    return <h1>error</h1>;
  }

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
      <section className={`mx-auto my-0 h-screen ${isMobile ? 'w-72' : 'w-220'}`}>
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
          <Formik initialValues={{ photos: [] }} onSubmit={() => alert('submitted')}>
            {(props: FormikProps<ProfilePicture>) => {
              const { setFieldValue, values } = props;
              return (
                <Form>
                  <UploadPhoto photos={photos} setPhotos={setPhotos} setFieldValue={setFieldValue} values={values} />
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
      <section className="absolute bottom-0">
        <Footer />
      </section>
    </div>
  );
};
