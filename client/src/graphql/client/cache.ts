import { InMemoryCache } from '@apollo/client';
import { accessToken } from '../reactive-variables/accessToken';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return accessToken();
          },
        },
      },
    },
  },
});
