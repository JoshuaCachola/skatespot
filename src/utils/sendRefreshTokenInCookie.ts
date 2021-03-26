import { Response } from 'express';

export const sendRefreshTokenInCookie = (res: Response, token: string): void => {
  res.cookie('jrt', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
