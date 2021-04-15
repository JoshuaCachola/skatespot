import React from 'react';
import { Formik, FormikProps, Form } from 'formik'; 
import { Upload } from '../utils/Upload';
// import { useCreateSkateSpotMutation } from 'src/generated/graphql';
import * as Yup from 'yup';

interface SkateSpotForm {
  name: string,
  address: string,
  state: string,
  city: string,
  files: Array<File>
};


export const CreateSkateSpot: React.FC = () => {
  // const [skateSpot] = useCreateSkateSpotMutation();

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          address: '',
          city: '',
          state: '',
          files: []
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          // skateSpot({variables: values});
          console.log(values.files)
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          address: Yup.string().required('Address is required.'),
          city: Yup.string().email().required('City is required.'),
          state: Yup.string().required('State is required'),
          files: Yup.mixed()
        })}
      >
        {(props: FormikProps<SkateSpotForm>) => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            setFieldValue
          } = props;
          return (
            <Form>
              <div>
                <div>
                  <input 
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
                  <input 
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
                  <input 
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
                  <input 
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
                <div className='flex flex-1 flex-col p-5 rounded border-2 border-dashed aira'>
                  <Upload values={values} setFieldValue={setFieldValue}/>
                </div>
                  <input
                    type='submit'
                    value='submit'
                    disabled={isSubmitting}
                  />
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};
