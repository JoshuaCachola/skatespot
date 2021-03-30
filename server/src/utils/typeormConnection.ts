import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm';

export const typeormConnection = {
  async create(): Promise<Connection> {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({ ...connectionOptions, name: 'default' }); // rename db to default in order for typeorm to recognize db
  },

  async close(): Promise<void> {
    await getConnection().close();
  },
};
