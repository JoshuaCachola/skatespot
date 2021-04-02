import { Arg, Field, Mutation, ObjectType, Query, Resolver, Ctx, UseMiddleware, Int } from 'type-graphql';
import argon2 from 'argon2';
import { User } from './entity/User';
import { createToken } from './utils/createToken';
import { TokenCookieCtx } from './utils/TokenCookieCtx';
import { isAuth } from './isAuth';
import { sendRefreshTokenInCookie } from './utils/sendRefreshTokenInCookie';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return 'hi';
  }

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
    @Ctx() { req, res }: TokenCookieCtx,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        accessToken: '',
      };
    }

    if (await argon2.verify(user.password, password)) {
      const accessToken = createToken.access(user);
      sendRefreshTokenInCookie(res, createToken.refresh(user));
      console.log(req.cookies);
      return {
        accessToken,
      };
    } else {
      return {
        accessToken: '',
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
  async logout(@Ctx() {res}: TokenCookieCtx) {
    sendRefreshTokenInCookie(res, '');
    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  users(): Promise<Array<User>> {
    return User.find();
  }
};
