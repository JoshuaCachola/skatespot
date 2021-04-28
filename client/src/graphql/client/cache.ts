import { InMemoryCache } from '@apollo/client';
import { accessToken } from '../reactive-variables/accessToken';
import { skateSpot } from '../reactive-variables/skateSpot';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return accessToken()
          }
        },
        skateSpot: {
          read() {
            return skateSpot()
          }
        }
      }
    }
  }
});