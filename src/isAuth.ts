import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { TokenCookieCtx } from './utils/TokenCookieCtx';

interface Payload {
  userId: string;
}

export const isAuth: MiddlewareFn<TokenCookieCtx> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authenticated...');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as Payload;
  } catch (err) {
    console.error(err);
  }

  return next();
};
