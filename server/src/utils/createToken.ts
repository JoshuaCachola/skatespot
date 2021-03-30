import { sign } from 'jsonwebtoken';
import { User } from 'src/entity/User';

export const createToken = {
  access(user: User): string {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '15m',
    });
  },

  refresh(user: User): string {
    return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '30d',
    });
  },
};
