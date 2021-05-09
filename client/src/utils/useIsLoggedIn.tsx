import React from 'react';
import { accessToken } from 'src/graphql/reactive-variables/accessToken';

export const useIsLoggedIn = (defaultValue) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(defaultValue);

  React.useEffect(() => {
    setIsLoggedIn(!!accessToken());

    return () => {
      setIsLoggedIn(false);
    };
  }, []);

  return [isLoggedIn, setIsLoggedIn];
};
