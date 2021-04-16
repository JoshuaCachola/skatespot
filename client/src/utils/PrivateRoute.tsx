import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom"
import { TokenContext } from './TokenContext';

interface Props {
  exact: boolean,
  path: string,
  component: any,
  componentProps?: object
}

export const PrivateRoute: React.FC<Props> = ({
  exact,
  path,
  component: Component,
  componentProps,
}) => {

  const { isLoggedIn } = useContext(TokenContext);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
};