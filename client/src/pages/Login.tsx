import React from 'react';
import { Formik, FormikProps, Form } from 'formik';
import { useLoginUserMutation } from 'src/generated/graphql';
import * as Yup from 'yup';

import {setAccessToken} from '../accessToken';
import { RouteComponentProps } from 'react-router';

interface LoginForm {
email: string,
password: string,
};

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [login] = useLoginUserMutation({ 
    onCompleted({login}) {
      setAccessToken(login.accessToken);
      console.log(login.accessToken);
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
            resetForm();
            setSubmitting(false);
            history.push('/');
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
                    <label htmlFor='email'>Email </label>
                    <input
                      name='email'
                      id='email'
                      value={values.email}
                      type='email'
                      placeholder='Email Address'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div>{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor='password'>Password </label>
                    <input
                      name='password'
                      id='password'
                      type='text'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <div>{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <input
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
