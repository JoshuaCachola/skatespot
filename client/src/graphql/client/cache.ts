import { InMemoryCache } from '@apollo/client';
import { accessToken } from '../reactive-variables/accessToken';
import { me } from '../reactive-variables/me';
import { searchResults } from '../reactive-variables/searchResults';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return accessToken();
          },
        },
        me: {
          read() {
            return me();
          },
        },
        searchResults: {
          read() {
            return searchResults();
          },
        },
      },
    },
  },
});
