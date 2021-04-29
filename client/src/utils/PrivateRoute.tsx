import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';

interface Props {
  exact: boolean;
  path: string;
  component: any;
  componentProps?: object;
}

export const PrivateRoute: React.FC<Props> = ({ exact, path, component: Component, componentProps }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (!!accessToken() ? <Component {...props} {...componentProps} /> : <Redirect to="/login" />)}
    />
  );
};
