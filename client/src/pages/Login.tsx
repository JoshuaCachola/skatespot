import React from 'react';
import { Formik, FormikProps, Form, Field } from 'formik';
import { useLoginUserMutation } from 'src/generated/graphql';
import * as Yup from 'yup';
import { accessToken } from '../graphql/reactive-variables/accessToken';
import { RouteComponentProps } from 'react-router';

interface LoginForm {
email: string,
password: string,
};

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [login] = useLoginUserMutation({ 
    onCompleted({login}) {
      accessToken(login.accessToken);
    }});
  
  return (
    <div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values, {setSubmitting, resetForm}) => {
            await login({ variables: values });
            setSubmitting(false);
            resetForm();
            if (!!accessToken()) {
              history.push('/'); 
            }
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Email is required'),
            password: Yup.string().required('Password is required')
          })}
        >
          {(props: FormikProps<LoginForm>) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
            } = props;
            return (
              <Form>
                <div>
                  <div>
                    <Field
                      name='email'
                      id='email'
                      value={values.email}
                      type='email'
                      placeholder='Email Address'
                      className='pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div>{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <Field
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Password'
                      className='pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <div>{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <Field
                      type='submit'
                      value='submit'
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
  );
};
