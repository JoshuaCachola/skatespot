import { gql, InMemoryCache, makeVar } from '@apollo/client';

export const accessToken = makeVar<string>('');

export const GET_ACCESS_TOKEN = gql`
  query getAccessToken{
    accessToken @client
  }
`;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return accessToken()
          }
        }
      }
    }
  }
});