import React from 'react';
import { Formik, FormikProps, Form, Field } from 'formik';
import { GetUserDocument, GetUserQuery, useLoginUserMutation } from 'src/generated/graphql';
import * as Yup from 'yup';
import { accessToken } from '../graphql/reactive-variables/accessToken';
import { RouteComponentProps } from 'react-router';
import { Footer } from './components/Footer';
import LoginHero from '../assets/LoginHero.png';
import { Link } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginUserMutation({
    onCompleted({ login }) {
      accessToken(login.accessToken);
    },
  });

  return (
    <div>
      {/* Logo */}
      <header className="flex text-3xl justify-around border-b border-red-500 h-full bg-red-500 py-5 m-0 text-white">
        <Link to="/">
          <h1 className="m-0 p-0">
            <span className="font-bold">Skate</span>
            <span className="font-thin">Spot</span>
          </h1>
        </Link>
      </header>
      <div className="flex w-200 mx-auto my-0 h-screen justify-between">
        <div className="my-auto mx-0">
          {/* Link to register for new users*/}
          <div className="flex justify-center my-2">
            <div className="font-semibold text-xl">
              <h2>
                <span>Log in to Skate Spot</span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-5">
            <div className="font-semibold text-base">
              <h3>
                <span>
                  New to Skate Spot?{' '}
                  <Link to="/register">
                    <span className="text-blue-700">Register</span>
                  </Link>
                </span>
              </h3>
            </div>
          </div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await login({
                variables: values,
                update: (store, { data }) => {
                  if (!data) {
                    return null;
                  }

                  return store.writeQuery<GetUserQuery>({
                    query: GetUserDocument,
                    data: {
                      getUser: data.login.user,
                    },
                  });
                },
              });
              setSubmitting(false);
              resetForm();
              if (!!accessToken()) {
                history.push('/');
              }
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required('Email is required'),
              password: Yup.string().required('Password is required'),
            })}
          >
            {(props: FormikProps<LoginForm>) => {
              const { values, touched, errors, isSubmitting, handleChange, handleBlur } = props;
              return (
                <Form>
                  <div className="border rounded border-gray-600">
                    <div className="m-5">
                      <Field
                        name="email"
                        id="email"
                        value={values.email}
                        type="email"
                        placeholder="Email Address"
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email && (
                        <div className="font-semibold text-black mt-2">{errors.email}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.password && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.password}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        type="submit"
                        value="Log In"
                        disabled={isSubmitting}
                        className="cursor-pointer font-bold bg-red-500 px-6 py-2 border rounded border-red-500 text-white"
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="w-80 h-80 my-auto mx-0">
          <img src={LoginHero} alt="login-hero" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
