import React from 'react';
import { Route, Redirect } from "react-router-dom"

interface Props {
  exact: boolean,
  path: string,
  component: any,
  needLogin: boolean,
  componentProps?: object
}

export const PrivateRoute: React.FC<Props> = ({
  exact,
  path,
  component: Component,
  needLogin,
  componentProps,
}) => (
  <Route
    exact={exact}
    path={path}
    render={(props) =>
      needLogin ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);