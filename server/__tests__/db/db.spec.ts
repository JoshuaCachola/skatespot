import { typeormConnection } from '../../src/utils/typeormConnection';


beforeAll(async () => {
  await typeormConnection.create();
});

afterAll(async () => {
  await typeormConnection.close();
});

it('verifies environment', () => {
  expect(process.env.NODE_ENV).toEqual('test');
  
});