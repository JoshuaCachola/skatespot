import { Request, Response } from 'express';

export interface TokenCookieCtx {
  req: Request;
  res: Response;
  payload?: { userId: string };
}
