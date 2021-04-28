import React from 'react';
import { Field, Form, Formik, FormikProps} from 'formik'; 
import { Upload } from '../utils/Upload';
import { useCreateSkateSpotMutation } from '../../src/generated/graphql';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router';
import { Header } from './components/Header';

interface SkateSpotForm {
  name: string,
  street: string,
  state: string,
  city: string,
  imgFiles?: Array<File>
};

export const CreateSkateSpot: React.FC<RouteComponentProps> = ({history}) => {
  const [createSkateSpotMutation, {loading, error}] = useCreateSkateSpotMutation();
  const initialValues: SkateSpotForm = {
    name: '',
    street: '',
    city: '',
    state: '',
    imgFiles: []
  };

  if (loading) {
    return <h1>loading</h1>;
  };

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <Header />
      <div className='w-140 mx-auto my-10 text-3xl font-bold'>
        <h1><span>Add Skate Spot</span></h1>
      </div>
      <div className='my-10 w-140 mx-auto border border-gray-600 rounded'>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, {resetForm, setSubmitting}) => {
            await createSkateSpotMutation({variables: values});
            setSubmitting(false);
            resetForm();
            setSubmitting(false);
            history.push('/')
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required.'),
            address: Yup.string().required('Address is required.'),
            city: Yup.string().required('City is required.'),
            state: Yup.string().required('State is required'),
            imgFiles: Yup.array()
          })}
        >
          {(props: FormikProps<SkateSpotForm>) => {
            const {
              values,
              handleChange,
              handleBlur,
              setFieldValue
            } = props;
            return (
              <Form>
                <div className='m-6'>
                  <div className='my-4 flex'>
                    <label id='name' className='w-12'>Name</label>
                    <Field 
                      name='name'
                      id='name'
                      type='text'
                      placeholder='Wallenberg High School'
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className='w-full ml-2 focus:outline-none focus:border-b-2 focus:border-red-500'
                    />
                  </div>
                  <div className='my-4 flex'>
                    <label id='street' className='w-12'>Street</label>
                      <Field 
                        name='street'
                        id='street'
                        type='text'
                        placeholder='40 Vega St'
                        value={values.street}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='w-full ml-2 focus:outline-none focus:border-b-2 focus:border-red-500'
                      />
                  </div>
                  <div className='my-4 flex'>
                    <label id='city' className='w-12'>City</label>
                      <Field 
                        name='city'
                        id='city'
                        type='text'
                        placeholder='San Francisco'
                        value={values.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='w-full ml-2 focus:outline-none focus:border-b-2 focus:border-red-500'
                      />
                  </div>
                  <div className='my-4 flex'>
                    <label id='state' className='w-12'>State</label>
                      <Field 
                        name='state'
                        id='state'
                        type='text'
                        placeholder='California'
                        value={values.state}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className='w-full ml-2 focus:outline-none focus:border-b-2 focus:border-red-500'
                      />
                  </div>
                  {/* Drag and drop */}
                  <section>
                    <Upload values={values} setFieldValue={setFieldValue}/>
                  </section>
                  <div className='my-4 mx-auto'>
                    <button
                      type='submit'
                      className='border border-red-500 px-8 py-2 rounded bg-red-500 text-white'
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  );
};
