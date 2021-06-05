import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useRegisterUserMutation } from 'src/generated/graphql';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { Footer } from './components/Footer';
import LoginHero from '../assets/LoginHero.png';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [register] = useRegisterUserMutation();

  return (
    <div className="bg-gray-50">
      <header
        className={`text-center w-full border-b border-r-4 border-black h-full bg-blue-400 py-5 m-0 text-white ${
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
        className={`flex align-middle mx-auto h-screen ${
          isTabletOrMobile ? 'w-3/4 justify-center' : 'w-200 justify-between'
        }`}
      >
        <div className="my-auto mx-0">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              register({ variables: values });
              resetForm();
              setSubmitting(false);
              history.push('/');
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required('First name is required.'),
              lastName: Yup.string().required('Last name is required.'),
              email: Yup.string().email().required('Email is required.'),
              username: Yup.string().required('Username is required'),
              password: Yup.string().required('Password is required.'),
              passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Password confirmation required.'),
            })}
          >
            {(props: FormikProps<RegisterForm>) => {
              const { values, touched, errors, isSubmitting, handleChange, handleBlur } = props;
              return (
                <Form>
                  <div className="my-2 font-semibold text-xl text-center">
                    <h1>Register for SkateSpot</h1>
                  </div>
                  <div className="border rounded border-gray-600 bg-white">
                    <div className="m-5">
                      <Field
                        name="username"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                      />
                      {errors.firstName && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.username}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                      />
                      {errors.firstName && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.email}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        name="firstName"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={values.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                      />
                      {errors.firstName && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.firstName}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        name="lastName"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={values.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                      />
                      {errors.firstName && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.lastName}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                      />
                      {errors.password && touched.password && (
                        <div className="font-semibold text-black mt-2">{errors.password}</div>
                      )}
                    </div>
                    <div className="m-5">
                      <Field
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Confirm Password"
                        value={values.passwordConfirmation}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="border-b border-black border-dashed font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
                      />
                      {errors.passwordConfirmation && touched.passwordConfirmation && (
                        <div className="font-semibold text-black mt-2">{errors.passwordConfirmation}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex my-5 justify-center">
                    <Field
                      type="submit"
                      value="Submit"
                      disabled={isSubmitting}
                      className="cursor-pointer font-bold px-6 py-2 rounded border-blue-400 bg-blue-400 border-r-2 border-b-2 border-l border-t hover:bg-blue-200 hover:text-blackborder-red-500 text-white"
                    />
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
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};
