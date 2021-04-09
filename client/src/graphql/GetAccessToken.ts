import { gql } from '@apollo/client';

export const GET_ACCESS_TOKEN = gql`
  query getAccessToken {
    accessToken @client
  }
`;