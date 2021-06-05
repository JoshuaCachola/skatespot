import React, { useEffect, useState } from 'react';
import { accessToken } from './graphql/reactive-variables/accessToken';
import { Routes } from './Routes';
import { TokenContext } from './utils/TokenContext';
import { useIsLoggedIn } from 'src/utils/useIsLoggedIn';
import { LoadingAnimation } from './pages/components/LoadingAnimation';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn(false);
  const [loading, setLoading] = useState<boolean>(true);
  const value = React.useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/refresh_token`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        accessToken(data.accessToken);

        !data.accessToken ? setIsLoggedIn(false) : setIsLoggedIn(true);

        setLoading(false);
      } catch (err) {
        console.error(err);
        return;
      }
    })();
  }, [setIsLoggedIn]);

  useEffect(() => {
    return () => {
      setIsLoggedIn(false);
      setLoading(true);
    };
  }, [setIsLoggedIn]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-50">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <TokenContext.Provider value={value}>
      <Routes />
    </TokenContext.Provider>
  );
};
