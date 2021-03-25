import {createConnection, getConnection, getConnectionOptions} from 'typeorm';

export const typeormConnection = {
  async create() {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV as string);
    return createConnection({ ...connectionOptions, name: "default" }); // rename db to default in order for typeorm to recognize db
  },

  async close() {
    await getConnection().close();
  },
};