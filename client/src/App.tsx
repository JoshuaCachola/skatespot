import React, { useEffect, useMemo, useState } from 'react';
// import { setAccessToken } from './accessToken';
import { accessToken } from './graphql/reactive-variables/accessToken';
import { Routes } from './Routes';
import { TokenContext } from './utils/TokenContext';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const value = useMemo(() => ({isLoggedIn, setIsLoggedIn}), [isLoggedIn, setIsLoggedIn]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/refresh_token`, {
          method: 'POST',
          credentials: 'include'
        });

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        // setAccessToken(data.accessToken);
        accessToken(data.accessToken);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
        return;
      }
      
    })()
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <TokenContext.Provider value={value}>
      <Routes />
    </TokenContext.Provider>
  );
}