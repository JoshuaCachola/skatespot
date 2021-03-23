import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection, getConnectionOptions } from 'typeorm';

(async () => {
	const app = express();
	app.get('/ping', (_, res) => res.send('pong'));

	await createConnection(await getConnectionOptions('default'));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver]
		})
	});

	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log('express server started...')
	});
})();

