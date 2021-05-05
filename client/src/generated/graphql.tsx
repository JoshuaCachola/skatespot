import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  revokeRefreshTokenForUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createSkateSpot: Scalars['Boolean'];
  singleUpload: Scalars['Boolean'];
  uploadProfilePicture: Scalars['Boolean'];
  createReview: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationCreateSkateSpotArgs = {
  imgFiles?: Maybe<Array<Scalars['Upload']>>;
  state: Scalars['String'];
  city: Scalars['String'];
  street: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadProfilePictureArgs = {
  picture: Scalars['Upload'];
};


export type MutationCreateReviewArgs = {
  imgFiles?: Maybe<Array<Scalars['Upload']>>;
  rating: Scalars['Int'];
  userId: Scalars['Int'];
  skateSpotId: Scalars['Int'];
  review: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
  me: User;
  getSkateSpots: Array<SkateSpot>;
  getSkateSpotReviews: Array<Review>;
  getUserReviews: Array<Review>;
};


export type QueryGetSkateSpotReviewsArgs = {
  skateSpotId: Scalars['Int'];
};


export type QueryGetUserReviewsArgs = {
  userId: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  review: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
  skateSpot: SkateSpot;
  skateSpotId: Scalars['Int'];
  imageUrls: Scalars['String'];
  rating: Scalars['Int'];
  createdAt: Scalars['DateTime'];
};

export type SkateSpot = {
  __typename?: 'SkateSpot';
  id: Scalars['Int'];
  name: Scalars['String'];
  categoryName: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  postalCode: Scalars['String'];
  countryCode: Scalars['String'];
  phone: Scalars['String'];
  website: Scalars['String'];
  temporarilyClosed: Scalars['Boolean'];
  permanentlyClosed: Scalars['Boolean'];
  imageUrls: Scalars['String'];
  location: Scalars['String'];
  popularTimesHistogram: Scalars['String'];
  reviewsCount: Scalars['Int'];
  reviewsDistribution: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type CreateReviewMutationVariables = Exact<{
  review: Scalars['String'];
  userId: Scalars['Int'];
  skateSpotId: Scalars['Int'];
  rating: Scalars['Int'];
  imgFiles?: Maybe<Array<Scalars['Upload']> | Scalars['Upload']>;
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createReview'>
);

export type CreateSkateSpotMutationVariables = Exact<{
  name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  imgFiles?: Maybe<Array<Scalars['Upload']> | Scalars['Upload']>;
}>;


export type CreateSkateSpotMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSkateSpot'>
);

export type GetSkateSpotReviewsQueryVariables = Exact<{
  skateSpotId: Scalars['Int'];
}>;


export type GetSkateSpotReviewsQuery = (
  { __typename?: 'Query' }
  & { getSkateSpotReviews: Array<(
    { __typename?: 'Review' }
    & Pick<Review, 'id' | 'review' | 'rating'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstName' | 'lastName'>
    ) }
  )> }
);

export type GetSkateSpotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSkateSpotsQuery = (
  { __typename?: 'Query' }
  & { getSkateSpots: Array<(
    { __typename?: 'SkateSpot' }
    & Pick<SkateSpot, 'id' | 'name' | 'categoryName' | 'street' | 'city' | 'postalCode' | 'state' | 'temporarilyClosed' | 'permanentlyClosed' | 'location' | 'reviewsCount' | 'reviewsDistribution' | 'imageUrls'>
  )> }
);

export type GetUserReviewsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetUserReviewsQuery = (
  { __typename?: 'Query' }
  & { getUserReviews: Array<(
    { __typename?: 'Review' }
    & Pick<Review, 'review' | 'createdAt' | 'id' | 'rating'>
    & { skateSpot: (
      { __typename?: 'SkateSpot' }
      & Pick<SkateSpot, 'name' | 'city' | 'state'>
    ) }
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken' | 'id'>
  ) }
);

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterUserMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const CreateReviewDocument = gql`
    mutation CreateReview($review: String!, $userId: Int!, $skateSpotId: Int!, $rating: Int!, $imgFiles: [Upload!]) {
  createReview(
    review: $review
    userId: $userId
    skateSpotId: $skateSpotId
    rating: $rating
    imgFiles: $imgFiles
  )
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      review: // value for 'review'
 *      userId: // value for 'userId'
 *      skateSpotId: // value for 'skateSpotId'
 *      rating: // value for 'rating'
 *      imgFiles: // value for 'imgFiles'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateSkateSpotDocument = gql`
    mutation CreateSkateSpot($name: String!, $street: String!, $city: String!, $state: String!, $imgFiles: [Upload!]) {
  createSkateSpot(
    name: $name
    street: $street
    city: $city
    state: $state
    imgFiles: $imgFiles
  )
}
    `;
export type CreateSkateSpotMutationFn = Apollo.MutationFunction<CreateSkateSpotMutation, CreateSkateSpotMutationVariables>;

/**
 * __useCreateSkateSpotMutation__
 *
 * To run a mutation, you first call `useCreateSkateSpotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSkateSpotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSkateSpotMutation, { data, loading, error }] = useCreateSkateSpotMutation({
 *   variables: {
 *      name: // value for 'name'
 *      street: // value for 'street'
 *      city: // value for 'city'
 *      state: // value for 'state'
 *      imgFiles: // value for 'imgFiles'
 *   },
 * });
 */
export function useCreateSkateSpotMutation(baseOptions?: Apollo.MutationHookOptions<CreateSkateSpotMutation, CreateSkateSpotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSkateSpotMutation, CreateSkateSpotMutationVariables>(CreateSkateSpotDocument, options);
      }
export type CreateSkateSpotMutationHookResult = ReturnType<typeof useCreateSkateSpotMutation>;
export type CreateSkateSpotMutationResult = Apollo.MutationResult<CreateSkateSpotMutation>;
export type CreateSkateSpotMutationOptions = Apollo.BaseMutationOptions<CreateSkateSpotMutation, CreateSkateSpotMutationVariables>;
export const GetSkateSpotReviewsDocument = gql`
    query GetSkateSpotReviews($skateSpotId: Int!) {
  getSkateSpotReviews(skateSpotId: $skateSpotId) {
    id
    review
    rating
    user {
      id
      username
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetSkateSpotReviewsQuery__
 *
 * To run a query within a React component, call `useGetSkateSpotReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkateSpotReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkateSpotReviewsQuery({
 *   variables: {
 *      skateSpotId: // value for 'skateSpotId'
 *   },
 * });
 */
export function useGetSkateSpotReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetSkateSpotReviewsQuery, GetSkateSpotReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkateSpotReviewsQuery, GetSkateSpotReviewsQueryVariables>(GetSkateSpotReviewsDocument, options);
      }
export function useGetSkateSpotReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkateSpotReviewsQuery, GetSkateSpotReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkateSpotReviewsQuery, GetSkateSpotReviewsQueryVariables>(GetSkateSpotReviewsDocument, options);
        }
export type GetSkateSpotReviewsQueryHookResult = ReturnType<typeof useGetSkateSpotReviewsQuery>;
export type GetSkateSpotReviewsLazyQueryHookResult = ReturnType<typeof useGetSkateSpotReviewsLazyQuery>;
export type GetSkateSpotReviewsQueryResult = Apollo.QueryResult<GetSkateSpotReviewsQuery, GetSkateSpotReviewsQueryVariables>;
export const GetSkateSpotsDocument = gql`
    query GetSkateSpots {
  getSkateSpots {
    id
    name
    categoryName
    street
    city
    postalCode
    state
    temporarilyClosed
    permanentlyClosed
    location
    reviewsCount
    reviewsDistribution
    imageUrls
  }
}
    `;

/**
 * __useGetSkateSpotsQuery__
 *
 * To run a query within a React component, call `useGetSkateSpotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkateSpotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkateSpotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSkateSpotsQuery(baseOptions?: Apollo.QueryHookOptions<GetSkateSpotsQuery, GetSkateSpotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkateSpotsQuery, GetSkateSpotsQueryVariables>(GetSkateSpotsDocument, options);
      }
export function useGetSkateSpotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkateSpotsQuery, GetSkateSpotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkateSpotsQuery, GetSkateSpotsQueryVariables>(GetSkateSpotsDocument, options);
        }
export type GetSkateSpotsQueryHookResult = ReturnType<typeof useGetSkateSpotsQuery>;
export type GetSkateSpotsLazyQueryHookResult = ReturnType<typeof useGetSkateSpotsLazyQuery>;
export type GetSkateSpotsQueryResult = Apollo.QueryResult<GetSkateSpotsQuery, GetSkateSpotsQueryVariables>;
export const GetUserReviewsDocument = gql`
    query GetUserReviews($userId: Int!) {
  getUserReviews(userId: $userId) {
    review
    createdAt
    id
    rating
    skateSpot {
      name
      city
      state
    }
  }
}
    `;

/**
 * __useGetUserReviewsQuery__
 *
 * To run a query within a React component, call `useGetUserReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetUserReviewsQuery, GetUserReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserReviewsQuery, GetUserReviewsQueryVariables>(GetUserReviewsDocument, options);
      }
export function useGetUserReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserReviewsQuery, GetUserReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserReviewsQuery, GetUserReviewsQueryVariables>(GetUserReviewsDocument, options);
        }
export type GetUserReviewsQueryHookResult = ReturnType<typeof useGetUserReviewsQuery>;
export type GetUserReviewsLazyQueryHookResult = ReturnType<typeof useGetUserReviewsLazyQuery>;
export type GetUserReviewsQueryResult = Apollo.QueryResult<GetUserReviewsQuery, GetUserReviewsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    id
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logout
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
  register(
    firstName: $firstName
    lastName: $lastName
    username: $username
    email: $email
    password: $password
  )
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;