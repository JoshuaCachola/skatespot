import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGetUserQuery } from 'src/generated/graphql';
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
  const { data } = useGetUserQuery();
  const [photos, setPhotos] = React.useState([]);

  console.log(location);
  React.useEffect(() => {
    console.log(photos);
  }, [data, photos]);

  // if (loading) {
  //   return <h1>loading</h1>;
  // }

  // if (error) {
  //   return <h1>error</h1>;
  // }

  return (
    <div>
      <Header />
      {/* Upload */}
      <div className="w-220 mx-auto my-0">
        <div className="mt-4 flex">
          {/* <Link to="/user-profile" className="text-blue-700 font-bold">
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
          <div className="font-extralight">Profile Pictures</div> */}
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
          <Formik initialValues={{ photos: [] }} onSubmit={() => alert('hello')}>
            {(props: FormikProps<SkateSpotPhotos>) => {
              const { setFieldValue, values } = props;
              return (
                <>
                  <Form>
                    <UploadPhoto photos={photos} setPhotos={setPhotos} setFieldValue={setFieldValue} values={values} />
                  </Form>
                  <div className="mt-6 justify-center flex">
                    <button
                      type="submit"
                      className="border rounded border-red-500 bg-red-500 text-white py-2 px-8 text-lg font-semibold"
                    >
                      Upload Photos
                    </button>
                  </div>
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
