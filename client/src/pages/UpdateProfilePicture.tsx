import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  GetUserQuery,
  GetUsersDocument,
  useGetUserQuery,
  useUpdateProfilePictureMutation,
} from 'src/generated/graphql';
import { Header } from 'src/pages/components/Header';
import { UploadPhoto } from 'src/utils/UploadPhoto';
import { Footer } from './components/Footer';
// import * as Yup from 'yup';

interface ProfilePicture {
  photos: Array<File>;
}

export const UpdateProfilePicture: React.FC<RouteComponentProps> = () => {
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
    }
  }, [data, photos, updatePhoto]);

  useEffect(() => {
    return () => {
      setPhotos([]);
    };
  }, []);

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
          <Formik initialValues={{ photos: [] }} onSubmit={() => alert('hello')}>
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
      </div>
      <Footer />
    </div>
  );
};
