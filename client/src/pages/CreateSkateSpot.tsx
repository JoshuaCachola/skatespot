import React from 'react';
import { Formik, FormikProps, Form } from 'formik'; 
import { Upload } from '../utils/Upload';
import { useCreateSkateSpotMutation } from 'src/generated/graphql';
import * as Yup from 'yup';
import { Thumbnail } from 'src/utils/Thumbnail';
import { RouteComponentProps } from 'react-router';

interface SkateSpotForm {
  name: string,
  address: string,
  state: string,
  city: string,
  imgs?: Array<File>
};

export const CreateSkateSpot: React.FC<RouteComponentProps> = ({history}) => {
  const [createSkateSpotMutation, {loading, error}] = useCreateSkateSpotMutation();

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  const create = () => {
    createSkateSpotMutation({variables: {
      name: "abc",
      address: "abcdef",
      city: "abdasklfj",
      state: "algjhasd",
    }});
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          address: '',
          city: '',
          state: '',
          imgs: []
        }}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
          createSkateSpotMutation({variables: values});
          resetForm();
          setSubmitting(false);
          history.push('/')
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          address: Yup.string().required('Address is required.'),
          city: Yup.string().email().required('City is required.'),
          state: Yup.string().required('State is required'),
          files: Yup.array()
        })}
      >
        {(props: FormikProps<SkateSpotForm>) => {
          const {
            values,
            // isSubmitting,
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
                  {values.imgs && values.imgs.map((img: File) => {
                    return (
                      <div key={img.name}>
                        <Thumbnail img={img} />
                      </div>
                    )
                  })}
                </div>
                <div>
                  <input
                    type='submit'
                    value='submit'
                    onClick={create}
                  />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};
