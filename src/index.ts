import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { typeormConnection } from './utils/typeormConnection';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { createToken } from './utils/createToken';
import { User } from './entity/User';
import { sendRefreshTokenInCookie } from './utils/sendRefreshTokenInCookie';

interface RefreshTokenPayload {
  userId: number;
  iat: number;
  exp: number;
  tokenVersion: number;
}

(async () => {
  const app = express();
  app.use(cookieParser());
  app.get('/ping', (_, res) => res.send('pong'));

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jrt;

    if (!token) {
      return res.json({ accessToken: '' });
    }

    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;
    } catch (err) {
      console.error(err);
      return res.json({ accessToken: '' });
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.json({ accessToken: '' });
    }

    sendRefreshTokenInCookie(res, createToken.refresh(user));
    return res.json({ accessToken: createToken.access(user) });
  });

  await typeormConnection.create();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log('express server started...');
  });
})();
