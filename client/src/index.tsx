import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloLink, ApolloProvider, /*createHttpLink,*/ HttpLink, Observable, /*useQuery*/} from '@apollo/client';
import { App } from './App';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
import { cache } from './graphql/client/cache';
import { GET_ACCESS_TOKEN } from '../src/graphql/GetAccessToken';
import { accessToken } from './graphql/reactive-variables/accessToken';
import './index.css';
import './fontawesome';



const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any;
    Promise.resolve(operation)
      .then(async (oper) => {
        const results = await client.query({
          query: GET_ACCESS_TOKEN,
          fetchPolicy: 'cache-only'
        });
        const accessToken = results.data.accessToken;
        console.log(accessToken);
        if (accessToken) {
          oper.setContext({
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          });
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken', 
      isTokenValidOrUndefined: () => {
        const token = accessToken();
        if (!token) {
          return true;
        }

        try {
          const {exp} = jwtDecode<JwtPayload>(token);
          if (!exp || Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch (err) {
          console.error(err);
          return false
        }
      },
      fetchAccessToken: async () => {
        return await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/refresh_token`, {
          method: 'POST',
          credentials: 'include'
        });
      },
      handleFetch: (token: string) => accessToken(token),
      handleError: (err: Error) => {
        console.warn('Your refresh token is invalid. Try to relogin.');
        console.error(err);
      }
    }),
    requestLink,
    new HttpLink({
      uri: `${process.env.REACT_APP_API_SERVICE_URL}/graphql`,
      credentials: 'include'
    })
  ]),
  cache
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

