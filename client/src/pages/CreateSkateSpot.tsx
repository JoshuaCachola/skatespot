import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import { Upload } from '../utils/Upload';
import { useCreateSkateSpotMutation } from '../../src/generated/graphql';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { skatespotObstacles, skatespotObstacleImages } from '../utils/skatespotObstacles';
import { LoadingAnimation } from './components/LoadingAnimation';
import { ErrorBanner } from './components/ErrorBanner';
import { useMediaQuery } from 'react-responsive';

interface SkateSpotForm {
  name: string;
  street: string;
  state: string;
  city: string;
  categoryName: 'Skateboard Park' | 'Park' | 'Street' | '';
  imgFiles?: Array<File>;
  skatespotObstacles: Array<string>;
}

export const CreateSkateSpot: React.FC<RouteComponentProps> = ({ history }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });
  const [createSkateSpotMutation, { loading, error }] = useCreateSkateSpotMutation();
  const initialValues: SkateSpotForm = {
    name: '',
    street: '',
    city: '',
    state: '',
    categoryName: '',
    imgFiles: [],
    skatespotObstacles: [],
  };

  return (
    <div className="bg-gray-50">
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto">
            <LoadingAnimation />
          </div>
        </div>
      )}
      <div>
        <Header />
      </div>
      <section className={`h-full mb-6 ${isMobile && 'overflow-y-scroll'}`}>
        {error && <ErrorBanner message="Error adding skate spot..." />}
        <div className={`text-3xl mx-auto my-10 font-bold ${isMobile ? 'w-72' : 'w-140'}`}>
          <h1>
            <span>Add Skate Spot</span>
          </h1>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            await createSkateSpotMutation({ variables: values });
            setSubmitting(false);
            resetForm();
            history.push('/');
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required.'),
            city: Yup.string().required('City is required.'),
            state: Yup.string().required('State is required'),
            categoryName: Yup.string().required('Category is required.'),
            imgFiles: Yup.array(),
            skatespotObstacles: Yup.array(),
          })}
        >
          {(props: FormikProps<SkateSpotForm>) => {
            const { values, handleChange, handleBlur, setFieldValue } = props;
            return (
              <Form>
                <div className={`my-10 mx-auto border border-gray-300 rounded bg-white ${isMobile ? 'w-72' : 'w-140'}`}>
                  <div className="m-6">
                    <div className="my-4 flex">
                      <label id="name" className="w-12 font-semibold">
                        Name
                      </label>
                      <Field
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Wallenberg High School"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="w-full ml-2 focus:outline-none border-b border-black border-dashed focus:shadow-xl"
                      />
                    </div>
                    <div className="my-4 flex">
                      <label id="street" className="w-12 font-semibold">
                        Street
                      </label>
                      <Field
                        name="street"
                        id="street"
                        type="text"
                        placeholder="40 Vega St"
                        value={values.street}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="w-full ml-2 focus:outline-none border-b border-black border-dashed focus:shadow-lg"
                      />
                    </div>
                    <div className="my-4 flex">
                      <label id="city" className="w-12 font-semibold">
                        City
                      </label>
                      <Field
                        name="city"
                        id="city"
                        type="text"
                        placeholder="San Francisco"
                        value={values.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="w-full ml-2 focus:outline-none border-b border-black border-dashed focus:shadow-lg"
                      />
                    </div>
                    <div className="my-4 flex">
                      <label id="state" className="w-12 font-semibold">
                        State
                      </label>
                      <Field
                        name="state"
                        id="state"
                        type="text"
                        placeholder="California"
                        value={values.state}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="w-full ml-2 focus:outline-none border-b border-black border-dashed focus:shadow-lg"
                      />
                    </div>
                    {/* Skatespot Category */}
                    <div className={`my-4 flex ${isMobile ? 'flex-col' : 'justify-between'}`}>
                      <label id="category-name" className="w-6 font-semibold">
                        Category
                      </label>
                      <label className="text-sm">
                        <Field type="radio" name="categoryName" value="Skateboard Park" />
                        &nbsp;Skateboard Park
                      </label>
                      <label className="text-sm">
                        <Field type="radio" name="categoryName" value="Park" />
                        &nbsp;Park
                      </label>
                      <label className="text-sm">
                        <Field type="radio" name="categoryName" value="Street" />
                        &nbsp;Street
                      </label>
                    </div>
                    {/* Skatespot Obstacles */}
                    <h2 className="text-center my-2 font-semibold">Skatespot Obstacles</h2>
                    <div className="flex flex-wrap justify-center">
                      {skatespotObstacles.map((obstacle) => {
                        return (
                          <div key={obstacle} className="text-center mx-2">
                            <label>
                              {!isMobile && (
                                <img
                                  src={skatespotObstacleImages[obstacle]}
                                  alt={obstacle}
                                  className="w-36 h-14 bg-gray-50"
                                />
                              )}
                              <Field type="checkbox" id={obstacle} name="skatespotObstacles" value={obstacle} />
                              <span>&nbsp;{obstacle}</span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Drag and drop */}
                <div className={`mx-auto my-0 ${isMobile ? 'w-72' : 'w-140'}`}>
                  <div className="my-4 font-bold text-xl">
                    <h4>Add Photos</h4>
                  </div>
                  <section className="bg-white">
                    <Upload values={values} setFieldValue={setFieldValue} />
                  </section>
                </div>

                <div className={`mx-auto mt-6 ${isMobile ? 'w-72' : 'w-140'}`}>
                  <button
                    type="submit"
                    className="border-l border-t border-r-2 border-b-2 border-blue-400 px-8 py-2 rounded bg-blue-400 text-white hover:bg-blue-200 hover:text-black focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
      <Footer />
    </div>
  );
};
