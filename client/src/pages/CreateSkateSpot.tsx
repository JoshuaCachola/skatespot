import React from 'react';
import { Field, Form, Formik, FormikProps} from 'formik'; 
import { Upload } from '../utils/Upload';
import { useCreateSkateSpotMutation } from '../../src/generated/graphql';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router';

interface SkateSpotForm {
  name: string,
  address: string,
  state: string,
  city: string,
  imgFiles?: Array<File>
};

export const CreateSkateSpot: React.FC<RouteComponentProps> = ({history}) => {
  const [createSkateSpotMutation, {loading, error}] = useCreateSkateSpotMutation();
  const initialValues: SkateSpotForm = {
    name: '',
    address: '',
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
    <>
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
              <div>
                <div>
                  <Field 
                    name='name'
                    id='name'
                    type='text'
                    placeholder='Name'
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Field 
                    name='address'
                    id='address'
                    type='text'
                    placeholder='Address'
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Field 
                    name='city'
                    id='city'
                    type='text'
                    placeholder='City'
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Field 
                    name='state'
                    id='state'
                    type='text'
                    placeholder='State'
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {/* Drag and drop */}
                <section>
                  <Upload values={values} setFieldValue={setFieldValue}/>
                </section>
                <div>
                  <button
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};
