import React, { useEffect, useState } from 'react';
// import { setAccessToken } from './accessToken';
import { accessToken } from './graphql/reactive-variables/accessToken';
import { Routes } from './Routes';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

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
        return;
      }
      
    })()
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return <Routes />;
}