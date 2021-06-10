import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { SkateSpotResolver } from './SkateSpotResolver';
import { typeormConnection } from './utils/typeormConnection';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { createToken } from './utils/createToken';
import { User } from './entity/User';
import { sendRefreshTokenInCookie } from './utils/sendRefreshTokenInCookie';
import cors from 'cors';
import { UploadResolver } from './UploadResolver';
import { graphqlUploadExpress } from 'graphql-upload';
import { ReviewResolver } from './ReviewResolver';

interface RefreshTokenPayload {
  userId: number;
  iat: number;
  exp: number;
  // tokenVersion: number;
}

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: `${process.env.NODE_ENV} === 'production' ? 'http://skatespot-alb-1172579719.us-west-2.elb.amazonaws.com' : 'http://localhost:3007'`,
      credentials: true,
    }),
  );
  app.use(graphqlUploadExpress());
  app.get('/ping', (_, res) => {
    res.send('pong');
  });

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jrt;

    if (!token) {
      return res.json({ accessToken: '' });
    }

    let payload;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;
    } catch (err) {
      console.error(err);
      return res.json({ accessToken: '' });
    }

    let user;
    if (payload.userId) {
      user = await User.findOne({ id: payload.userId });
    }
    if (!user /*|| user.tokenVersion !== payload.tokenVersion*/) {
      return res.json({ accessToken: '' });
    }

    sendRefreshTokenInCookie(res, createToken.refresh(user));
    return res.json({ accessToken: createToken.access(user) });
  });

  await typeormConnection.create();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, SkateSpotResolver, UploadResolver, ReviewResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    uploads: false,
    playground: true,
    introspection: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 6000;

  app.listen(port, () => {
    console.log('express server started...');
  });
})();
