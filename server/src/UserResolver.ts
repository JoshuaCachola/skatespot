import { Arg, Field, Mutation, ObjectType, Query, Resolver, Ctx, UseMiddleware, Int } from 'type-graphql';
import argon2 from 'argon2';
import { User } from './entity/User';
import { createToken } from './utils/createToken';
import { TokenCookieCtx } from './types/TokenCookieCtx';
import { isAuth } from './utils/isAuth';
import { sendRefreshTokenInCookie } from './utils/sendRefreshTokenInCookie';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

interface Payload {
  userId: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  id: number;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return false;
    }

    try {
      const hashedPassword = await argon2.hash(password);
      await User.insert({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
      });
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: TokenCookieCtx,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        accessToken: '',
        id: -1,
      };
    }

    if (await argon2.verify(user.password, password)) {
      const accessToken = createToken.access(user);
      sendRefreshTokenInCookie(res, createToken.refresh(user));
      return {
        accessToken,
        id: user.id,
      };
    } else {
      return {
        accessToken: '',
        id: -1,
      };
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number): Promise<boolean> {
    try {
      await getConnection().getRepository(User).increment({ id: userId }, 'tokenVersion', 1);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: TokenCookieCtx) {
    sendRefreshTokenInCookie(res, '');
    return true;
  }

  @Query(() => String)
  hello(): string {
    return 'hi';
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(): Promise<Array<User>> {
    return await User.find();
  }

  @Query(() => User)
  async me(@Ctx() { req }: TokenCookieCtx) {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    const accessToken = authorization.split(' ')[1];
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as Payload;

    return await User.findOne(payload.userId);
  }
}
