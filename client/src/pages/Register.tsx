import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { useRegisterUserMutation } from 'src/generated/graphql';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';


interface RegisterForm {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
};

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterUserMutation();
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          register({variables: values});
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
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur
          } = props;
          return (
            <Form>
              <div>
                <div>
                  <label htmlFor='firstName'>First Name </label>
                  <input 
                    name='firstName'
                    id='firstName'
                    type='text'
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='lastName'>Last Name </label>
                  <input 
                    name='lastName'
                    id='lastName'
                    type='text'
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='username'>Username </label>
                  <input 
                    name='username'
                    id='username'
                    type='text'
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='email'>Email </label>
                  <input 
                    name='email'
                    id='email'
                    type='email'
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='password'>Password </label>
                  <input 
                    name='password'
                    id='password'
                    type='password'
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <div>{errors.password}</div>
                  )}
                </div>
                <div>
                  <label htmlFor='passwordConfirmation'>Verify Password </label>
                  <input 
                    name='passwordConfirmation'
                    id='passwordConfirmation'
                    type='password'
                    value={values.passwordConfirmation}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.passwordConfirmation && touched.passwordConfirmation && (
                    <div>{errors.passwordConfirmation}</div>
                  )}
                </div>
                <div>
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