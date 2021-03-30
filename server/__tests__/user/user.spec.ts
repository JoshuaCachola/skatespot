import { GraphQLClient, gql } from 'graphql-request';
import { User } from '../../src/entity/User';
import { typeormConnection } from '../../src/utils/typeormConnection';


beforeAll(async () => {
  await typeormConnection.create();
});

afterAll(async () => {
  await typeormConnection.close();
});

const client = new GraphQLClient("http://localhost:4008/graphql");

it('registers a user', async () => {
  const variables = {
    email: "test@user.com",
    password: "testpassword",
    firstName: "test",
    lastName: "user",
    username: "test_user"
  };

  const mutation = gql`
    mutation RegisterUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!){
      register(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password)
    }
  `

  const data = await client.request(mutation, variables);
  expect(data).toEqual({"register": true});
  const users = await User.find({ where: { email: "test@user.com" }});
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(variables.email);
  expect(user.password).not.toEqual(variables.password);
});

it('logs in a user and returns an access token', async () => {
  const variables = {
    email: "test@user.com",
    password: "testpassword",
  }

  const mutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
      }
    }
  `;

  const {login} = await client.request(mutation, variables); 
  expect(login.accessToken).not.toEqual('');
});

it('does not log in user with invalid email', async () => {
  const variables = {
    email: "test@other-user.com",
    password: "testpassword"
  }

  const mutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
      }
    }
  `;

  const {login} = await client.request(mutation, variables); 
  expect(login.accessToken).toEqual('');
});

it('does not log in user with invalid password', async () => {
  const variables = {
    email: "test@user.com",
    password: "othertestpassword"
  }

  const mutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
      }
    }
  `;

  const {login} = await client.request(mutation, variables); 
  expect(login.accessToken).toEqual('');
});

it('returns hi', async () => {
  const query = gql`{
    hello
  }
  `

  const { data } = await client.rawRequest(query);
  expect(data).toEqual({"hello": "hi"});
});