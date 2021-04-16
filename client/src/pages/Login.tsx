import React from 'react';
import { Formik, FormikProps, Form } from 'formik';
import { useLoginUserMutation } from 'src/generated/graphql';
import * as Yup from 'yup';

// import {setAccessToken} from '../accessToken';
import { accessToken } from '../graphql/reactive-variables/accessToken';
import { RouteComponentProps } from 'react-router';

interface LoginForm {
email: string,
password: string,
};

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [login] = useLoginUserMutation({ 
    onCompleted({login}) {
      // setAccessToken(login.accessToken);
      // console.log(login.accessToken);
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
            console.log('login');
            await login({ variables: values });
            resetForm();
            setSubmitting(false);
            await history.push('/');
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
                    <input
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
                    <input
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
