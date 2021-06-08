import apolloTesting from 'apollo-server-testing';
// import { User } from '../../src/entity/User';
import { typeormConnection } from '../../src/utils/typeormConnection';
import { createReadStream } from 'fs';
const path = require('path');
import { ApolloServer } from 'apollo-server-express';

beforeAll(async () => {
  await typeormConnection.create();
});

afterAll(async () => {
  await typeormConnection.close();
});

// const schema = async () => await buildSchema({
//     resolvers: [UploadResolver, UserResolver]
// });
const resolvers = {
  Mutation: {},
};

const testServer = new ApolloServer({
  resolvers,
});

const client = apolloTesting.createTestClient(testServer);

it('adds file to aws and returns url for file', async () => {
  const filename = '';
  const file = createReadStream(path.resolve(__dirname, `../utils/${filename}`));

  const mutation = `
    mutation ($picture: Upload!) {
      uploadProfilePicture(picture: $picture)
    } 
  `;

  const res = await client.mutate({
    mutation,
    variables: {
      picture: new Promise((resolve) =>
        resolve({
          createReadStream: () => file,
          stream: file,
          filename,
        }),
      ),
    },
  });

  if (res.errors) {
    throw res;
  }
  expect(res.data.ok).toBe(true);
  expect(res.data.url).not.toBe('');
});
