import React from 'react';
// import { Form, Formik, FormikProps } from 'formik';
import { Header } from './Homepage/Header';
import { UserInfo } from './UserInfo';

interface Props {

}

export const UserProfile: React.FC<Props> = () => {

  return(
    <>
    <h1>User Profile</h1>
      <nav>
        <Header />
      </nav>
      <div>
        <UserInfo />
      </div>
    </>
  );
}