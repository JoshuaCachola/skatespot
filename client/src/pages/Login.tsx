import React from 'react';
import { Formik, FormikProps, Form, Field } from 'formik';
import { GetUserDocument, GetUserQuery, useLoginUserMutation } from 'src/generated/graphql';
import * as Yup from 'yup';
import { accessToken } from '../graphql/reactive-variables/accessToken';
import { RouteComponentProps } from 'react-router';
import { Footer } from './components/Footer';
import LoginHero from '../assets/LoginHero.png';
import { Link } from 'react-router-dom';
import { TokenContext } from 'src/utils/TokenContext';
import { useMediaQuery } from 'react-responsive';

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { setIsLoggedIn } = React.useContext(TokenContext);
  const [login, { error }] = useLoginUserMutation({
    onCompleted({ login }) {
      accessToken(login.accessToken);
      setIsLoggedIn(true);
    },
  });

  return (
    <div className="bg-gray-50">
      {/* Logo */}
      <header
        className={`text-center border-b border-r-4 border border-black bg-blue-400 py-5 m-0 text-white w-full ${
          isTabletOrMobile ? 'text-2xl' : 'text-3xl'
        }`}
      >
        <Link to="/">
          <h1 className="m-0 p-0">
            <span className="font-bold">Skate</span>
            <span className="font-thin">Spot</span>
          </h1>
        </Link>
      </header>
      <div
        className={`flex mx-auto align-middle h-screen ${
          isTabletOrMobile ? 'w-3/4 justify-center' : 'w-200 justify-between flex'
        }`}
      >
        <div className="my-auto mx-0">
          {/* Link to register for new users*/}
          <div className="flex justify-center my-2">
            <div className="font-semibold text-xl">
              <h2>
                <span>Log in to SkateSpot</span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-5">
            <div className="font-semibold text-base">
              <h3>
                <span>
                  New to SkateSpot?{' '}
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
                update: (cache, { data }) => {
                  if (!data) {
                    return null;
                  }

                  return cache.writeQuery<GetUserQuery>({
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
                  <div className="border rounded border-gray-600 bg-white">
                    <div className="m-5">
                      <Field
                        name="email"
                        id="email"
                        value={values.email}
                        type="email"
                        placeholder="Email Address"
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg w-full"
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
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg w-full"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.password && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.password}</div>
                      )}
                    </div>
                    {error && (
                      <div className="text-center font-bold">
                        <p>Invalid username or password...</p>
                        <p>Please try again...</p>
                      </div>
                    )}
                    <div className="m-5">
                      <Field
                        type="submit"
                        value="Log In"
                        disabled={isSubmitting}
                        className="cursor-pointer font-bold px-6 py-2 rounded border-blue-400 bg-blue-400 border-r-2 border-b-2 border-l border-t hover:bg-blue-200 hover:text-blackborder-red-500 text-white"
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        {isTabletOrMobile ? (
          <></>
        ) : (
          <div className="w-80 h-80 my-auto mx-0">
            <img src={LoginHero} alt="login-hero" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
