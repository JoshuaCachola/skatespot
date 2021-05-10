import { InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import { accessToken } from '../reactive-variables/accessToken';
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
        getSkateSpots: concatPagination(),
        searchResults: {
          read() {
            return searchResults();
          },
        },
      },
    },
  },
});
